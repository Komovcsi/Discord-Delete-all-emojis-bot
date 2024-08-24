
# Discord Emoji Deleter

So I had a lot of emojis in my server and I was sick of it. I wanted to start fresh. So I made this bot that delets all emojis from the server.



## Features

- Deletion of all emojis in a server. 


## Installation

First you need to have node.js installed on your system. After that run the folowing in a folder:

```bash
  npm init -y
  npm install discord.js
  ```
After that change information in config.json file and run:

```bash
  node deploy-commands.js
  node index.js
  ```

  Now just run /deleteallemojis command in the server you want all emojis to be deleted. You will see output in terminal saying which emojis are getting deleted. They are deleted in batches so don't worry if it stops for a second or two