-- INSERT statements to populate our tables


-- Note, we should run the trainer table inserts first since pokemon have a trainerID
-- this way we don't have to go back and update those tables.

-- Trainers table intial inserts
INSERT INTO Trainers (name, catchphrase)
VALUES(("Klaus", "Make this code more complicated."), ("Tyler", "Make this code more simple."),
("Brock", "Let's Rock!"), ("Misty", "Starmie, Water Gun!"), ("Lt. Surge", "You're shocking, kid!"),
("Erika", "My grass Pokemon are razor sharp!"), ("Koga", "Poison Pokemon are my soul."), ("Sabrina", "You can't beat me, I'm psychic."),
("Blaine", "Watch out kid or you'll get burnt!"), ("Giovanni", "Don't mess with Team Rocket!"));



-- Pokemon table intial inserts
INSERT INTO Pokemon (name, type, attack, trainerID)
VALUES(("Bulbasaur", "Grass", "Vine Whip", 6), ("Ivysaur", "Grass", "Razor Leaf", 7), ("Venasaur", "Grass", "Solarbeam", 10),
("Squirtle", "Water", "Bubble", NULL), ("Wartortle", "Water", "Water Gun", NULL), ("Blastoise", "Water", "Hydro Pump", 4),
("Charmander", "Fire", "Ember", NULL), ("Charmeleon", "Fire", "Fire Spin", 2), ("Charizard", "Fire", "Flamethrower", 9),
("Pikachu", "Electric", "Thundershock", 5), ("Machop", "Fighting", "Karate Chop", 3), ("Mewtwo", "Psychic", "Psybeam", 1), 
("Alakazam", "Psychic", "Confusion", 8));



-- Badges table intial inserts
INSERT INTO Badges (name, color)
VALUES (("Boulder", "Gray"), ("Cascade", "Blue"), ("Thunder", "Orange"),
("Rainbow", "Rainbow"), ("Soul", "Fuschia"), ("Marsh", "Yellow"),
("Volcano", "Red"), ("Earth", "Green"));



-- Gyms table intial inserts
INSERT INTO Gyms (name, trainerID, badgeID)
VALUES(("Pewter City", 3, 1), ("Cerulean", 4, 2), ("Vermilion", 5, 3),
("Celadon", 6, 4), ("Fuchsia City", 7, 5) ("Saffron City", 8, 6),
("Cinnabar Island", 9, 7), ("Viridian City", 10, 8));



-- Trainers_Badges table intial inserts
INSERT INTO Trainers_Badges (trainerID, badgeID)
VALUES((1,1), (1,3), (1,4), (1,7),
(2,1), (2,2), (2,5), (2,6), (2,8));
		
-- test edit to see if name was updated on my git bash