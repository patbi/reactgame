import React, { useRef, useEffect, useState } from 'react';
import InputManager from './InputManager';
import World from './World';

const ReactRogue = ({width, height, tileSize}) => { 
  const canvasRef = useRef();
  const [world, setWorld] = useState(new World(width, height, tileSize));

  let inputManager = new InputManager();

  const handleInput = (action, data) => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    setWorld(newWorld);
  };

  useEffect(() => {
    // draw the map (for the first time, and once only)
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createMap();
    newWorld.spawnPlayer();
    newWorld.spawnLoot();
    newWorld.spawnMonsters();
    newWorld.spawnStairs();
    newWorld.addToHistory(`Level ${newWorld.level}!`);
    setWorld(newWorld);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty list param to useEffect equates to first time render only (no dependencies) :rolleyes:

  useEffect(() => {
    // console.log('Bind input');
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    // useEffect also returns a function to be called
    // when the component is closed
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    };
  });

  useEffect(() => {
    // console.log("Draw to canvas");
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width * tileSize, height * tileSize);
    world.draw(ctx);
  });

  return (
    <>
      <canvas 
        ref={canvasRef}
        width={width * tileSize} 
        height={height * tileSize}
        style={{ border: '1px solid black', background: 'DimGray' }}
      ></canvas>
      <ul>
        { world.player && world.player.inventory.map((item, index) => (<li key={index}>{item.attributes.name}</li>)) }
      </ul>
      <ul>
        { world.history && world.history.map((item, index) => (<li key={index}>{item}</li>)) }
      </ul>
    </>
  );
};

export default ReactRogue;
