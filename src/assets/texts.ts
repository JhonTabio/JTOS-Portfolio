type Mode = "cli" | "gui";

export const TEXTS: Record<string, Record<Mode, string>> = {
  "~_welcome": {
    cli: "Welcome to my portfolio page!\nThis is my first full fledged React project, \
          more specifically this is the Command-Line Interface (CLI) experience \
          and my first take on simulating a terminal environment.\nThis experience tries to replicate \
          and remain faithful to the terminal experience, so it may be a little difficult traversing \
          this experience as a first timer if you are not used to managing a terminal.\n\n\
          Some neat things to note:\
          \n\t+ Autocomplete using Tab for commands/directories\
          \n\t+ Core commands, use help for more info. Here are some useful commands:\
          \n\t\t> cat (view files)\
          \n\t\t> ls (list files in directory)\
          \n\t\t> cd (change directories)\
          \n\t+ Project stats / info are dynamically updated\
          \n\t+ Loads of API calls (Not abusing calls, I swear!)\
          \n\t+ echo, color, and backtick functionalities of commands for fun :)\
          \n\t+ Cheeky secrets laid around!\
          \n\n\
          Some not-so-neat things to note:\
          \n\t- Erroneous results with autocomplete with more than 1 argument\
          \n\t- Would certainly restructure this project again, better backend design\
          \n\t- Still a work in progress project!",
    gui: "👋 Welcome to my portfolio page!\n\
          This is my first full fledged React project, more specifically this is the Graphical User Interface (GUI)\
          and my first take on simulating a desktop experience, so it may not be perfect!\n\n\
          This experience tries to replicate and remain faithful to the file system / desktop environment experience.\
          My speciality and interests is more towards backend development, so the frontend presentation may not look 100%\
          like the source material.\n\n\
          Some neat things to note:\
          \n\t• ✅ Customizable Window component & Window Management context\
          \n\t• ✅ Draggable and resizable hooks\
          \n\t• ⏳ Customizable themes\
          \n\t• ✅ File system visualization and traversal\n\n\
          Enjoy your stay!"
  },

  "Documents_info": {
    cli: "Here you are able to view some of my accomplishments!\n\
          To view more details on a project, you can use the same cat command on a .proj file (still case sensitive!)\
          \n\nYou'll see up-to-date stats on my GitHub Repositories, as the data provided are fetched live (and cached for those who are wondering)",
    gui: "📂 My accomplishments and projects live here. Click to explore live GitHub stats and project write-ups!"
  },

  "Downloads_info": {
    cli: "I am still not too sure what to do with this directory...\
          \nSo if you see this, then hello! You caught this prior to being ready :)",
    gui: "📥 I am still not too sure what to do with this directory...\
          \nSo if you see this, then hello! You caught this prior to being ready :)"
  },

  "Music_info": {
    cli: "Here you are able to see my most favored playlists!\
          \nInterestingly enough, you're able to suggest some songs and add to my suggestions playlist, \
          I'll try to get to it as soon as possible! I am always open to new music.",
    gui: "🎧 Here you are able to see my most favored playlists!\
          \nInterestingly enough, you're able to suggest some songs and add to my suggestions playlist, \
          I'll try to get to it as soon as possible! I am always open to new music."
  },

  "Pictures_info": {
    cli: "Just like documents, I am not sure what I will do with this. Hey pt2!",
    gui: "📸 Just like documents, I am not sure what I will do with this. Hey pt2!"
  },

  "Videos_info": {
    cli: "You won't believe me when I say... do I need to even say it? Hey pt3 :)",
    gui: "🎥 You won't believe me when I say... do I need to even say it? Hey pt3 :)"
  }
}
