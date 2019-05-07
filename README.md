# LiriBot

##Welcome to LiriBot

L.I.R.I is a language interpretation and response interface, that takes command line input and gives responses for specific commands. Below are commands that function with Liri, and what to expect from each.

###concert-this
This command is implemented in the following way:

`node liri.js concert-this '<artist/band name here>'`

The above command will take your input between the single quotes, and return a list of concerts and venues for the given artists from the bandsintown API.

###spotify-this-song
This command is implemented by typing the following into the CLI:

`node liri.js spotify-this-song '<song name in here>'`

The above command will take your command and then give back information about the song name you provide, from the spotify API.

###movie-this
This command is used the following way:

`node liri.js movie-this '<movie name here>`

The above command will return information about your movie, from the omdb API.

###do-what-it-says
This is a special command. This command is used the following way:

`node liri.js do-what-it-says`

The above command doesn't take a second argument, because the argument comes from the random.txt file found in the repository. Liri will retrieve the information from the file, which is currently written to take the argument 'I Want it That Way' from the spotify-this command.
