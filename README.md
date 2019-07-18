# What you'll need
1. Windows (preferably Windows 10)
2. Minecraft Java Edition Version 1.12.2
3. Minecraft Forge Client (single-player) Version 1.12.2
4. Java version 8
5. RaspberryJam Minecraft Mod
6. Python 3
7. Node.js
8. Internet connection (for cdn packages)

# Setup Minecraft
1. Install Minecraft on target machine

2. Start the Minecraft Launcher and click installations
![Step 1.1](public/media/readme_images/step1-1.png)

3. Click on the new button to create a new installation
![Step 1.4](public/media/readme_images/step1-4.png)

4. Click the version dropdown
![Step 1.2](public/media/readme_images/step1-3.png)

5. Select version 12.1.2
![Step 1.3](public/media/readme_images/step1-2.png)

6. Click Create to save the new installation
![Step 1.5](public/media/readme_images/step1-5.png)

7. Select the newly created installation
![Step 1.6](public/media/readme_images/step1-6.png)

8. Click play to start a game with the new installation
![Step 1.7](public/media/readme_images/step1-7.png)

# Setup Forge and Raspberry Jam Mod
1. Install Java version 8
![Step 2.1](public/media/readme_images/step2-1.png)

2. Install Python 3

3. Download Minecraft Forge version 1.12.2 at: https://files.minecraftforge.net/
![Step 2.2](public/media/readme_images/step2-2.png)

4. Start the Windows Installer and install the forge client version
![Step 2.3](public/media/readme_images/step2-3.png)

5. Start the minecraft launcher and select the newly created installation
![Step 2.4](public/media/readme_images/step2-4.png)

6. Go to the Raspberry Jam Repository at https://github.com/arpruss/raspberryjammod and click clone or download
![Step 2.5](public/media/readme_images/step2-5.png)

7. Click Download Zip
![Step 2.6](public/media/readme_images/step2-6.png)

8. Extract the contents of the raspberry jam mod zip to c:\Users\*YOUR USERNAME*\AppData\Roaming\.minecraft 

9. There will now be a mods.zip file in the .minecraft folder. Extract the contents of this in to the .minecraft\mods folder 

10. Using the Minecraft Launcher, launch the 1.12.2 Forge version of minecraft. 

# Start Pycrafty
First, install node.js on your system. You can download it at: https://nodejs.org/en/

To verify node is properly installed open up a terminal and type:
```
node -v 
```
You should see a version number displayed in the terminal.

Run ```npm install``` from the folder which holds the Pycrafty code.
This will install any dependencies for the server on the machine.

Next, start a server for Pycrafty by running the command
```
node bin\www
```
in the project root directory.

Then to launch the Pycrafty application go to the address localhost:3000 in a web browser.
You should now see the full work environment.

# Create a script:
Enter the desired file name in the text box with the text "File name" and click 
the Create Script button. It is recommended to use just alphanumeric characters for the file name.
The file should be saved in the appropriate directory.
If no file name is entered in that text box a file named "script.py" is created
instead. 

# Creating and executing a generated script in Minecraft
Assuming a script was created with the file name "file.py"
open up a minecraft chat window and type: 
```
/lpy file.py
```
to run the script in Minecraft.

# Libraries Used
    * Blockly: https://developers.google.com/blockly/
    * node.js: https://nodejs.org/en/
    * express-generator: https://expressjs.com/en/starter/generator.html
    * picnic CSS: https://picnicss.com/
    
