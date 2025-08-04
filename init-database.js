const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres', // Connect to default database first
  password: 'password', // Change this to your PostgreSQL password
  port: 5432,
});

async function initializeDatabase() {
  try {
    console.log('Initializing Popreel.lol database...');

    // Create database if it doesn't exist
    try {
      await pool.query('CREATE DATABASE popreel_db');
      console.log('Database "popreel_db" created successfully');
    } catch (error) {
      if (error.code === '42P04') {
        console.log('Database "popreel_db" already exists');
      } else {
        throw error;
      }
    }

    // Connect to the new database
    const dbPool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'popreel_db',
      password: 'password', // Change this to your PostgreSQL password
      port: 5432,
    });

    // Create videos table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS videos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(50) DEFAULT 'general',
        creator VARCHAR(100) DEFAULT 'Anonymous',
        video_url VARCHAR(500) NOT NULL,
        thumbnail_url VARCHAR(500),
        likes INTEGER DEFAULT 0,
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Videos table created successfully');

    // Create comments table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
        comment TEXT NOT NULL,
        author VARCHAR(100) DEFAULT 'Anonymous',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Comments table created successfully');

    // Create users table (for future authentication)
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        avatar_url VARCHAR(500),
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created successfully');

    // Insert sample data
    const sampleVideos = [
      {
        title: 'Amazing Sunset Timelapse',
        description: 'Beautiful sunset captured over the ocean',
        category: 'lifestyle',
        creator: '@user123',
        video_url: '/uploads/sample1.mp4',
        thumbnail_url: 'https://picsum.photos/300/200?random=1',
        likes: 1200,
        views: 5000
      },
      {
        title: 'Cooking Tutorial: Pasta Carbonara',
        description: 'Learn to make authentic Italian pasta carbonara',
        category: 'lifestyle',
        creator: '@chef_mike',
        video_url: '/uploads/sample2.mp4',
        thumbnail_url: 'https://picsum.photos/300/200?random=2',
        likes: 3400,
        views: 12000
      },
      {
        title: 'Gaming Highlights: Epic Win!',
        description: 'Incredible gaming moment that went viral',
        category: 'gaming',
        creator: '@gamer_pro',
        video_url: '/uploads/sample3.mp4',
        thumbnail_url: 'https://picsum.photos/300/200?random=3',
        likes: 5600,
        views: 25000
      },
      {
        title: 'Tech Review: Latest Smartphone',
        description: 'Comprehensive review of the newest smartphone',
        category: 'tech',
        creator: '@tech_reviewer',
        video_url: '/uploads/sample4.mp4',
        thumbnail_url: 'https://picsum.photos/300/200?random=4',
        likes: 2800,
        views: 15000
      },
      {
        title: 'Dance Challenge: Viral Move',
        description: 'Join the latest dance challenge trend',
        category: 'music',
        creator: '@dance_queen',
        video_url: '/uploads/sample5.mp4',
        thumbnail_url: 'https://picsum.photos/300/200?random=5',
        likes: 8900,
        views: 45000
      },
      {
        title: 'Travel Vlog: Paris Adventure',
        description: 'Exploring the beautiful city of Paris',
        category: 'lifestyle',
        creator: '@travel_buddy',
        video_url: '/uploads/sample6.mp4',
        thumbnail_url: 'https://picsum.photos/300/200?random=6',
        likes: 4300,
        views: 18000
      }
    ];

    // Check if sample data already exists
    const existingVideos = await dbPool.query('SELECT COUNT(*) FROM videos');
    if (existingVideos.rows[0].count === '0') {
      for (const video of sampleVideos) {
        await dbPool.query(`
          INSERT INTO videos (title, description, category, creator, video_url, thumbnail_url, likes, views)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
          video.title,
          video.description,
          video.category,
          video.creator,
          video.video_url,
          video.thumbnail_url,
          video.likes,
          video.views
        ]);
      }
      console.log('Sample videos inserted successfully');
    } else {
      console.log('Sample data already exists, skipping insertion');
    }

    // Insert sample comments
    const sampleComments = [
      { video_id: 1, comment: 'Amazing video! Love the colors', author: '@viewer1' },
      { video_id: 1, comment: 'Where was this filmed?', author: '@viewer2' },
      { video_id: 2, comment: 'Great tutorial! Will try this recipe', author: '@cook123' },
      { video_id: 2, comment: 'What brand of pasta do you recommend?', author: '@foodie' },
      { video_id: 3, comment: 'Epic gameplay!', author: '@gamer_fan' },
      { video_id: 3, comment: 'What game is this?', author: '@new_gamer' },
      { video_id: 4, comment: 'Great review, very informative', author: '@tech_enthusiast' },
      { video_id: 4, comment: 'Is it worth the price?', author: '@budget_buyer' },
      { video_id: 5, comment: 'Love this dance!', author: '@dance_lover' },
      { video_id: 5, comment: 'How do you learn these moves?', author: '@dance_beginner' },
      { video_id: 6, comment: 'Paris is beautiful!', author: '@travel_lover' },
      { video_id: 6, comment: 'What camera did you use?', author: '@photographer' }
    ];

    const existingComments = await dbPool.query('SELECT COUNT(*) FROM comments');
    if (existingComments.rows[0].count === '0') {
      for (const comment of sampleComments) {
        await dbPool.query(`
          INSERT INTO comments (video_id, comment, author)
          VALUES ($1, $2, $3)
        `, [comment.video_id, comment.comment, comment.author]);
      }
      console.log('Sample comments inserted successfully');
    } else {
      console.log('Sample comments already exist, skipping insertion');
    }

    console.log('Database initialization completed successfully!');
    console.log('You can now start the server with: npm start');

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initializeDatabase(); 
