-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS banco_petshop;
USE banco_petshop;

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Criar tabela de pets
CREATE TABLE IF NOT EXISTS Pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  pet_name VARCHAR(255) NOT NULL,
  breed VARCHAR(255) NOT NULL,
  appointment_date DATETIME NOT NULL,
  notes TEXT,
  image_path VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);