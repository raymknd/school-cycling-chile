<?php 
  define("DEV", true);
  define("HOST", "localhost");
  define("USERNAME", DEV ? "root" : "");
  define("PASSWORD", DEV ? "Janitox1976," : "");
  define("DATABASE", DEV ? "raymknd_main" : "");
  try {
    $connection = new PDO("mysql:host=".HOST.";dbname=".DATABASE, USERNAME, PASSWORD);
  } catch (PDOException $e) {
      exit("Error: " . $e->getMessage());
  }
?>