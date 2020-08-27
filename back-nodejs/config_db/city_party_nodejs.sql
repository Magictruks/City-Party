-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 27 août 2020 à 22:15
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `city_party_nodejs`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `label`) VALUES
(1, 'Bar'),
(2, 'Boite de nuit'),
(5, 'Soirée dansante'),
(6, 'Bière pong'),
(7, 'Intégration'),
(8, 'Universitaire'),
(9, 'Manifestation');

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `address` varchar(255) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `price` double NOT NULL,
  `date_begin_at` datetime NOT NULL,
  `date_end_at` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL,
  `image_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `image_id` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `event`
--

INSERT INTO `event` (`id`, `label`, `content`, `address`, `latitude`, `longitude`, `price`, `date_begin_at`, `date_end_at`, `created_at`, `user_id`, `image_id`) VALUES
(37, 'New event', 'zae', '20 Rue de la Ronde, 57050 Metz, France', 49.1282349, 6.156891999999999, 20, '2020-08-27 11:26:49', '2020-08-28 11:26:49', '2020-08-26 11:26:57', 6, NULL),
(39, 'Session Collage', 'Rendez vous devant le troubadoir à 22h pour montrer au monde que les Wegour existe et que nique la police #ACAB', '32 Rue du Pont des Morts, 57000 Metz, France', 49.1204517, 6.169123199999999, 0, '2020-08-29 22:00:15', '2020-08-30 01:00:15', '2020-08-26 12:08:34', 10, NULL),
(41, 'Test 2 euro', 'aze', '12 Rue Oudinot, 75007 Paris, France', 48.8505031, 2.3175463, 2, '2020-08-26 14:36:21', '2020-08-27 14:36:21', '2020-08-26 14:36:30', 6, NULL),
(42, 'Test 2 2euro', 'zer', '12 Rue Oudinot, 75007 Paris, France', 48.8505031, 2.3175463, 2, '2020-08-26 14:36:42', '2020-08-27 14:36:42', '2020-08-26 14:36:54', 10, NULL),
(43, 'Truc', 'azerty', '10 Avenue des Ternes, 75017 Paris, France', 48.8784397, 2.2960129, 20, '2020-08-27 17:10:39', '2020-08-28 17:10:39', '2020-08-26 17:10:51', 10, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `event_category`
--

DROP TABLE IF EXISTS `event_category`;
CREATE TABLE IF NOT EXISTS `event_category` (
  `event_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  KEY `category_id` (`category_id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `event_category`
--

INSERT INTO `event_category` (`event_id`, `category_id`) VALUES
(37, 1),
(37, 2),
(39, 9),
(41, 1),
(41, 2),
(42, 2),
(42, 5),
(43, 5),
(43, 8);

-- --------------------------------------------------------

--
-- Structure de la table `event_user`
--

DROP TABLE IF EXISTS `event_user`;
CREATE TABLE IF NOT EXISTS `event_user` (
  `event_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `favorite` tinyint(1) NOT NULL,
  `participate` tinyint(1) NOT NULL,
  KEY `event_id` (`event_id`),
  KEY `event_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `event_user`
--

INSERT INTO `event_user` (`event_id`, `user_id`, `favorite`, `participate`) VALUES
(37, 1, 0, 0),
(37, 6, 1, 0),
(39, 6, 1, 0),
(39, 1, 1, 1),
(42, 1, 0, 1),
(41, 1, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `roles` longtext NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `refresh_token` longtext DEFAULT NULL,
  `image_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `firstname`, `lastname`, `address`, `latitude`, `longitude`, `created_at`, `refresh_token`, `image_id`) VALUES
(1, 'turchini.axel@gmail.com', 'ROLE_ADMIN', '$2a$10$ho6SlnlTtGkF9uqnwmxFB.GeLGhSOh2UnjfyBo2eFjEMEqv/vG2b6', 'Axel', 'Turchini', '20 rue de la ronde, Metz', NULL, NULL, '2020-08-24 09:31:10', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0dXJjaGluaS5heGVsQGdtYWlsLmNvbSIsInJvbGVzIjoiUk9MRV9BRE1JTiIsImZpcnN0bmFtZSI6IkF4ZWwiLCJsYXN0bmFtZSI6IlR1cmNoaW5pIiwiYWRkcmVzcyI6IjIwIHJ1ZSBkZSBsYSByb25kZSwgTWV0eiIsImxhdGl0dWRlIjpudWxsLCJsb25naXR1ZGUiOm51bGwsImlhdCI6MTU5ODU2NTA5MX0.1vrh_mxVZ82pqblVZ0we-QuypSuMqR5eV21eKQ9HSMI', NULL),
(6, 'adri57@gmail.com', 'ROLE_PROMOTER', '$2a$10$ho6SlnlTtGkF9uqnwmxFB.GeLGhSOh2UnjfyBo2eFjEMEqv/vG2b6', 'Adrien', 'Sallard', '20 rue de l\'IFA', NULL, NULL, '2020-08-24 10:39:19', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJhZHJpNTdAZ21haWwuY29tIiwicm9sZXMiOiJST0xFX1BST01PVEVSIiwiZmlyc3RuYW1lIjoiQWRyaWVuIiwibGFzdG5hbWUiOiJTYWxsYXJkIiwiaWF0IjoxNTk4NTMwODY2fQ.35QgVFOdgSHSNmE1wRbR35YF_GUSRuQYO2jzAc0M13Y', NULL),
(10, 'lisa@gmail.com', 'ROLE_PROMOTER', '$2y$10$bBP1EraXqSeQh7la69I8.OEjG3jdmlsiNUhOpy7nSOPK/B3DdkGsK', 'Lisa', 'Decker Mansuy', '20 Rue de Rivoli, 75004 Paris, France', '48.85593490000001', '2.3588539', '2020-08-26 11:58:02', NULL, NULL);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `event_category`
--
ALTER TABLE `event_category`
  ADD CONSTRAINT `event_category_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `event_category_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON UPDATE SET NULL;

--
-- Contraintes pour la table `event_user`
--
ALTER TABLE `event_user`
  ADD CONSTRAINT `event_user_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `event_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
