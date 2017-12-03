-- Data Definition Queries

-- Pokemon table definition
CREATE TABLE `Pokemon` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
`type` varchar(255) NOT NULL,
`attack` varchar(255) NOT NULL,
`trainerID` int(11),
PRIMARY KEY (`id`),
UNIQUE (`name`)
)ENGINE=InnoDB;

-- Trainers table definition
CREATE TABLE `Trainers` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
`catchphrase` varchar(255) NOT NULL,
PRIMARY KEY (`id`)
)ENGINE=InnoDB;

-- Gyms table definition
CREATE TABLE `Gyms` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
`trainerID` int(11),
`badgeID` int(11),
PRIMARY KEY (`id`),
FOREIGN KEY (`trainerID`) REFERENCES `Trainers` (`id`),
FOREIGN KEY (`badgeID`) REFERENCES `Badges` (`id`),
UNIQUE (`name`)
)ENGINE=InnoDB;

-- Badges table definition
CREATE TABLE `Badges` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
`color` varchar(255) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE (`name`)
)ENGINE=InnoDB;

-- Trainer_Badge relationship table definition
CREATE TABLE `Trainer_Badge` (
`trainerID` int(11) NOT NULL,
`badgeID` int(11) NOT NULL,
FOREIGN KEY (`trainerID`) REFERENCES `Trainers` (`id`) ON DELETE CASCADE,
FOREIGN KEY (`badgeID`) REFERENCES `Badges` (`id`)
)ENGINE=InnoDB;





