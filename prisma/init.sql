-- PostgreSQL Table Initialization Script for Jain Ninad

-- 0. Users Table for Authentication & Access Control
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Hashed password
    role VARCHAR(50) NOT NULL DEFAULT 'admin',
    token TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 1. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    id VARCHAR(255) PRIMARY KEY DEFAULT 'default',
    "currentLocation" TEXT NOT NULL,
    "currentStayDetails" TEXT NOT NULL,
    "mahamantraText" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Vihar Schedules Table
CREATE TABLE IF NOT EXISTS vihar_schedules (
    id VARCHAR(255) PRIMARY KEY,
    date VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    "isCurrent" BOOLEAN NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Pravachans Table
CREATE TABLE IF NOT EXISTS pravachans (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    "youtubeId" VARCHAR(255),
    "audioUrl" TEXT,
    duration VARCHAR(255),
    date VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Jivan Neeti Quotes Table
CREATE TABLE IF NOT EXISTS jivan_neeti_quotes (
    id VARCHAR(255) PRIMARY KEY,
    "quoteHindi" TEXT NOT NULL,
    "quoteEnglish" TEXT,
    category VARCHAR(255) NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. Granth Books Table
CREATE TABLE IF NOT EXISTS granth_books (
    id VARCHAR(255) PRIMARY KEY,
    "titleHindi" VARCHAR(255) NOT NULL,
    "titleEnglish" VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    "versesCount" VARCHAR(255) NOT NULL,
    "coverImage" TEXT,
    "pdfLink" TEXT,
    "pdfFilePath" TEXT,
    language VARCHAR(255) NOT NULL DEFAULT 'Hindi',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Podcast Episodes Table
CREATE TABLE IF NOT EXISTS podcast_episodes (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    "guestHost" VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    "youtubeId" VARCHAR(255) NOT NULL,
    duration VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7. Blog Updates Table
CREATE TABLE IF NOT EXISTS blog_updates (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    snippet TEXT NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255) NOT NULL DEFAULT 'Admin',
    date VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
