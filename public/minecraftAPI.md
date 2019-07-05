# Python Minecraft API
## Minecraft.py
* [Minecraft](##Minecraft) - Main class for connecting to and interacting with the game.
  * [Player](##Player) - getting and changing the players position and settings
  * [Entity](##Entity) - getting and changing an entity's position and settings
  * [Camera](##Camera) - changing camera angle and position
  * events - retreiving events which have occurred in the game
* ~~~
  import mcpi.minecraft as minecraft
  ~~~
## Minecraft
1. .create(address, port)
 * Inputs
    * address - address of server
    * port - port on server
  * Outputs
    * minecraft server object
  * Example
    * use default address and port
        * ~~~
          mc = minecraft.Minecraft.create()
          ~~~
    * specify ip address and port
        * ~~~
          mc = minecraft.Minecraft.create("192.168.1.1", 4711)
          ~~~
2. .getBlock(x,y,z)
   * Inputs
     * x,y,z coordinates (can be grouped in Vec3 object)
   * Outputs
     * Block ID
   * Example
     * Retrieves the block type at 0,0,0
       * ~~~
         blockType = mc.getBlock(0,0,0)
         ~~~
3. .getBlocks(x0,y0,z0,x1,y1,z1)
   * Inputs
     * x0,y0,z0 coordinates (can be grouped in Vec3 object)
     * x1,y1,z1 coordinates (can be grouped in Vec3 object)
   * Outputs
     * List of block ids
   * Example
     * Get the block id's in a cuboid
       * ~~~
         blocks = mc.getBlocks(-1,-1,-1,1,1,1)\
         for block in blocks:
             print block
         ~~~
4. .getBlockWithData(x,y,z)
   * Inputs
     * x,y,z coordinates (can be grouped in Vec3 object)
   * Outputs
     * Block object
   * Example
     * retrieves a block object for the block at 0,0,0
       * ~~~
         blockObj = mc.getBlockWithData(0,0,0)
         ~~~
5. .setBlock(x,y,z)
   * Inputs
     * x coordinate
       * x,y coordinates (can be grouped in Vec3 object)
       * Type - base type for block
       * Subtype - subtype for block
   * Outputs
     * n/a - modifies in game block at provided coordinates
   * Example
     * sets a block at an x, y, z co-ordinate to a particular type   
       * ~~~
         mc.setBlock(0,0,0,block.DIRT.id)
         ~~~
   * sets a block to a particular type and 'subtype' 
     * ~~~
       mc.setblock(0,0,0,block.WOOD.id, 1)
       ~~~
6. .setBlocks(x0,y0,z0,x1,y1,z1,blockType, blockData)
   * Inputs
     * x0,y0,z0 coordinates (can be grouped in Vec3 object)
     * x1,y1,z1 coordinates (can be grouped in Vec3 object)
     * Block type and data (can be grouped in block object)
   * Outputs
     * n/a - modifies cuboid of blocks between given coordinates 
   * Example
     * sets many blocks at a time, filling the gap between 2 sets of x,y, z coordinates
     * ~~~
       mc.setBlocks(-1, -1, -1, 1, 1, 1, block.STONE.id)
       ~~~
7. .getHeight(x,z)
   * Inputs
     * x, y coordinates (can be grouped in Vec3 object)
   * Outputs
     * Max height of blocks in world at given coordinates
   * Example
     * find the y (vertical) of an x, z co-ordinate which represents the 'highest' (non-air) block
       * ~~~
         y = mc.getHeight(0,0)
         ~~~
8. .getPlayerEntityIds()
   * Inputs
     * n/a
   * Outputs
     * list of player ids
   * Example
     * get the entity id's of the players connected to the game
       * ~~~
         entityIds = mc.getPlayerEntityIds()
         ~~~
9. .getPlayerId(playerName)
   * Inputs
     * Player name
   * Outputs
     * player id
   * Example
     * get the entity id of a name player 'lljksod'
       * ~~~
         entityId = mc.getPlayerId("martinohanlon")
         ~~~
10. .saveCheckpoint()
    * Inputs
      * n/a
    * Outputs
      * ?
    * Example
      * Save a checkpoint that can be used for restoring the world
        * ~~~
          mc.saveCheckpoint()
          ~~~
11. .postToChat(message)
    * Inputs
      * Message
    * Outputs
      * Posts message to in game chat
    * Example
      * write 'Hello Minecraft World' to the chat window
        * ~~~
          mc.postToChat("Hello Minecraft World")
          ~~~
12. .setting(setting, status)
    * Inputs
      * Setting - in game option
      * Status - True or False
    * Outputs
      * n/a - adjust in game option
    * Example
      * change world immutable to True
        * ~~~
          mc.setting("world_immutable", True)
          ~~~
      * change nametags_visible setting to False
        * ~~~
          mc.setting("nametags_visible", False)
          ~~~
## Player
1. .getPos()
   * Inputs
     * n/a
   * Outputs
     * Vec3 object with players current position
   * Example
     * get players position as floats
       * ~~~
         playerPos = mc.player.getPos()
         ~~~
2. .setPos(x,y,z)
   * Inputs
     * x,y,z coordinates (can be grouped in Vec3 object)
   * Outputs
     * n/a - updates players position in game
   * Example
     * Move player to specified positon 10,10,10
       * ~~~
         mc.player.setPos(10,10,10) 
         ~~~
3. .getTilePos()
   * Input
     * N/a
   * Output
     * Vec3 Object of tile coordinates
   * Example
     * get coordinates of tile player is standing on
       * ~~~
         playerTile = mc.player.getTilePos()
         ~~~ 
4. .setTilePos(x,y,z)
   * Inputs
     * x,y,z coordinates (can be grouped in Vec3 object)
   * Outputs
     * n/a - moves player on top of tiles coordinates
   * Example
     * move player to tile
       * ~~~
         mc.player.setTilePos(1,1,1)

         print("Move to tile 1,1,1")

         time.sleep(2)

         mc.player.setTilePos(playerTile)
         ~~~
5. .setting(setting, status)
   * Input
     * Player setting - name of setting
     * Status - true or false
   * Outputs
     * n/a - changes player setting in game
   * Example
     * turn auto jump off and on
       * ~~~
         mc.player.setting("autojump", False)

         print("Autojump off, 5 seconds to test")

         time.sleep(5)

         mc.player.setting("autojump", True)

         print("Autojump back on")
         ~~~
6. .getRotation()
   * Inputs
     * N/A
   * Outputs
     * Rotation angle as float
   * Example
     * Get and print player rotation
       * ~~~
         playerRot = mc.player.getRotation()

         print(playerRot)
         ~~~
7. .getPitch()
   * Inputs
     * N/A
   * Outputs
     * Pitch angle as float
   * Example
     * get and print player pitch
       * ~~~
         playerPitch = mc.player.getPitch()

         print(playerPitch)
         ~~~
8. .getDirection()
   * Inputs
     * N/A
   * Outputs
     * Player direction as vec3 object
   * Example
     * Get and print player direction
       * ~~~
         playerDirection = mc.player.getDirection()

         print(playerDirection)
         ~~~     
## Entity
1. .getPos(entityId)
   * Inputs
     * Entity Id (can get using mc.getPlayerEntityIds())
   * Outputs
     * position as vec3 object
   * Example
     * get players position
       * ~~~
         entityPos = mc.entity.getPos(entityIds[0])

         print("entity pos" , entityPos) 
         ~~~
2. .setPos(entityId,x,y,z)
   * Inputs
     * Entity ID
     * x,y,z coordinates (can be grouped in Vec3 object)
   * Outputs
     * N/A - changes entitys position in game
   * Example
     * change entity position
       * ~~~
         entityPos = mc.entity.getPos(entityIds[0])

         print("entity pos" , entityPos)

         mc.entity.setPos(entityIds[0], 20,20,20)

         time.sleep(2)

         mc.entity.setPos(entityIds[0], entityPos)
         ~~~
3. .getTilePos(entityId)
   * Inputs
     * Entity ID
   * Outputs
     * Vec3 position of tile entity is on
   * Example
     * print position of tile entity is on
       * ~~~
         entityTilePos = mc.entity.getTilePos(entityIds[0])

         print("Entity tile pos", entityTilePos) 
         ~~~
4. .setTilePos(entityId, x,y,z)
   * Inputs
     * Entity ID
     * x,y,z coordinates (can be grouped in Vec3 object)
   * Outputs
     * N/A - changes entitys tile position in game
   * Example
     * change entity tile position
       * ~~~
         mc.entity.setTilePos(entityIds[0], 15,1,25)

         time.sleep(2)

         mc.entity.setTilePos(entityIds[0], entityTilePos) 
         ~~~
5. .getRotation(entityId)
   * Inputs
     * Entity Id
   * Outputs
     * Entity rotation angle
   * Example
     * get entity rotation
       * ~~~
         entityRot = mc.entity.getRotation(entityIds[0])

         mc.postToChat(entityRot) 
         ~~~
6. .getPitch(entityId)
   * Inputs
     * Entity Id
   * Outputs
     * Entity pitch angle
   * Example
     * get entity pitch
       * ~~~
         entityPitch = mc.entity.getPitch(entityIds[0])

         mc.postToChat(entityPitch) 
         ~~~
7. .getDirection(entityId)
   * Inputs
     * Entity ID
   * Outputs
     * Vec3 Object of entity direction
   * Example
     * get entity direction
       * ~~~
         entityDirection = mc.entity.getDirection(entityIds[0])

         mc.postToChat("Entity direction = ")
         mc.postToChat(entityDirection) 
         ~~~
## Camera
1. .setNormal(entityId)
   * Inputs
     * Entity Id
   * Outputs
     * n/a - sets entity camera to normal in game
   * Example
     * set entity camera to normal
       * ~~~
         mc.camera.setNormal(entityId)
         ~~~
2. .setFixed()
   * Inputs
     * N/A
   * Outputs
     * N/A - set entity camera to fixed in game
   * Example
     * set entity camera to fixed
       * ~~~
         ~~~
## Block
Block(id: int)  
Block(id: int, data: int)  

.id  
"The id (or type) of block"  

AIR                 = Block(0)  
STONE               = Block(1)  
GRASS               = Block(2)  
DIRT                = Block(3)  
COBBLESTONE         = Block(4)  
WOOD_PLANKS         = Block(5)  
SAPLING             = Block(6)  
BEDROCK             = Block(7)  
WATER_FLOWING       = Block(8)  
WATER               = WATER_FLOWING  
WATER_STATIONARY    = Block(9)  
LAVA_FLOWING        = Block(10)  
LAVA                = LAVA_FLOWING 
LAVA_STATIONARY     = Block(11)  
SAND                = Block(12)  
GRAVEL              = Block(13)  
GOLD_ORE            = Block(14)  
IRON_ORE            = Block(15)  
COAL_ORE            = Block(16)  
WOOD                = Block(17)  
LEAVES              = Block(18)  
GLASS               = Block(20)  
LAPIS_LAZULI_ORE    = Block(21)  
LAPIS_LAZULI_BLOCK  = Block(22)  
SANDSTONE           = Block(24)  
BED                 = Block(26)  
COBWEB              = Block(30)  
GRASS_TALL          = Block(31)  
WOOL                = Block(35)  
FLOWER_YELLOW       = Block(37)  
FLOWER_CYAN         = Block(38)  
MUSHROOM_BROWN      = Block(39)  
MUSHROOM_RED        = Block(40)  
GOLD_BLOCK          = Block(41)  
IRON_BLOCK          = Block(42)  
STONE_SLAB_DOUBLE   = Block(43)  
STONE_SLAB          = Block(44)  
BRICK_BLOCK         = Block(45)  
TNT                 = Block(46)  
BOOKSHELF           = Block(47)  
MOSS_STONE          = Block(48)  
OBSIDIAN            = Block(49)  
TORCH               = Block(50)  
FIRE                = Block(51)  
STAIRS_WOOD         = Block(53)  
CHEST               = Block(54)  
DIAMOND_ORE         = Block(56)  
DIAMOND_BLOCK       = Block(57)  
CRAFTING_TABLE      = Block(58)  
FARMLAND            = Block(60)  
FURNACE_INACTIVE    = Block(61)  
FURNACE_ACTIVE      = Block(62)  
DOOR_WOOD           = Block(64)  
LADDER              = Block(65)  
STAIRS_COBBLESTONE  = Block(67)  
DOOR_IRON           = Block(71)  
REDSTONE_ORE        = Block(73)  
SNOW                = Block(78)  
ICE                 = Block(79)  
SNOW_BLOCK          = Block(80)  
CACTUS              = Block(81)  
CLAY                = Block(82)  
SUGAR_CANE          = Block(83)  
FENCE               = Block(85)  
GLOWSTONE_BLOCK     = Block(89)  
BEDROCK_INVISIBLE   = Block(95)  
STONE_BRICK         = Block(98)  
GLASS_PANE          = Block(102)  
MELON               = Block(103)  
FENCE_GATE          = Block(107)  
GLOWING_OBSIDIAN    = Block(246)  
NETHER_REACTOR_CORE = Block(247)  

.data  
"The data (or sub-type) of a block"  

Data Values of blocks:  
WOOL:  
0: White  
1: Orange  
2: Magenta  
3: Light Blue  
4: Yellow  
5: Lime  
6: Pink  
7: Grey  
8: Light grey  
9: Cyan  
10: Purple  
11: Blue  
12: Brown  
13: Green  
14: Red  
15:Black  

WOOD:  
0: Oak (up/down)  
1: Spruce (up/down)  
2: Birch (up/down)  
(below not on Pi)  
3: Jungle (up/down)  
4: Oak (east/west)  
5: Spruce (east/west)  
6: Birch (east/west)  
7: Jungle (east/west)  
8: Oak (north/south)  
9: Spruce (north/south)  
10: Birch (north/south)  
11: Jungle (north/south)  
12: Oak (only bark)  
13: Spruce (only bark)  
14: Birch (only bark)  
15: Jungle (only bark)  

WOOD_PLANKS (Not on Pi):
0: Oak  
1: Spruce  
2: Birch  
3: Jungle  

SAPLING:  
0: Oak  
1: Spruce  
2: Birch  
3: Jungle (Not on Pi)  

GRASS_TALL:  
0: Shrub  
1: Grass  
2: Fern  
3: Grass (color affected by biome) (Not on Pi)  

TORCH:  
1: Pointing east  
2: Pointing west  
3: Pointing south  
4: Pointing north  
5: Facing up  

STONE_BRICK:  
0: Stone brick  
1: Mossy stone brick  
2: Cracked stone brick  
3: Chiseled stone brick  

STONE_SLAB / STONE_SLAB_DOUBLE:  
0: Stone  
1: Sandstone  
2: Wooden  
3: Cobblestone  
4: Brick  
5: Stone Brick  
Below - not on Pi  
6: Nether Brick  
7: Quartz  

Not on Pi  
SNOW_BLOCK:  
0-7: Height of snow, 0 being the lowest, 7 being the highest.  

TNT:  
0: Inactive  
1: Ready to explode  

LEAVES:  
1: Oak leaves  
2: Spruce leaves  
3: Birch leaves  

SANDSTONE:  
0: Sandstone  
1: Chiseled sandstone  
2: Smooth sandstone  

STAIRS_[COBBLESTONE, WOOD]:  
0: Ascending east  
1: Ascending west  
2: Ascending south  
3: Ascending north  
4: Ascending east (upside down)  
5: Ascending west (upside down)  
6: Ascending south (upside down)  
7: Ascending north (upside down)  

LADDERS, CHESTS, FURNACES, FENCE_GATE:  
2: Facing north  
3: Facing south  
4: Facing west  
5: Facing east  

[WATER, LAVA]_STATIONARY:  
0-7: Level of the water, 0 being the highest, 7 the lowest  

NETHER_REACTOR_CORE:  
0: Unused  
1: Active  
2: Stopped / used up  

## BlockEvent  
The definition of a BlockEvent in Minecraft, used to describe an event in Minecraft affecting blocks; returned by the Minecraft.events.pollBlockHits() method
~~~
blockEvent = mc.events.pollBlockHits()
~~~
BlockEvent Attributes

.type  
~~~
blockEventType = blockEvent.type
~~~
Only one value for type is actually possible right now which is the constant: BlockEvent.HIT

.pos  
BlockEvent.pos is a Vec3 object describing the (x,y,z) position of the block when the event occurred 

.face  
The face of the block where the event occurred.

.entityId
The entityId of the player who hit the block.
       
## ChatEvent
Describes an event when a message is posted to the chat bar in Minecraft, returned by Minecraft.events.pollBlockHits() method.  

Example:
~~~
chatEvent = mc.events.pollChatPosts()
~~~

Attributes:
1. .type  
    Type of block event; there is only 1 event currently implemented ChatEvent.POST
    ~~~
     chatEventType = chatEvent.type
    ~~~
2. .message  
    The message which was posted to the chat window.
    ~~~
    chatEventMessage = chatEvent.message
    ~~~
3. .entityId
    entityId of the player who posted the message to the chat.  
    ~~~
    chatEventMessage = ChatEvent.entityId
    ~~~

## Vec3
The definition of a 3 part vector in Minecraft(a set of x, y, z coordinates):  
x and z = the horizontal positions, y is vertical    

Example:  
~~~
position = vec3.Vec(0, 0, 0)
~~~
