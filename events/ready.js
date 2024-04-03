const Discord = require( 'discord.js' );
const mongoose = require( 'mongoose' );

module.exports = {
	name: 'ready',
	once: true,
	async run( client ) {
    
    mongoose.set( 'strictQuery', false );
    // https://discord.com/developers/docs/topics/gateway-events#presence
    // setActivity types = [ 'PLAYING', 'STREAMING', 'LISTENING', 'WATCHING', 'CUSTOM', 'COMPETING' ]
    client.user.setActivity( 'Lord of the Rings', { type: 3 } );
    mongoose.disconnect( () => console.log( 'Closed MongoDBs.' ) );
    await mongoose.connect( process.env.mongodb || '', { keepAlive: true } )
      .then( connected => { console.log( 'Connected to MongoDB.' ); } )
      .catch( errDB => {
        console.error( 'Failed to connect to MongoDB:\n\t%s\n\t%o',
          Array.from( errDB.reason.servers.keys() ).join( '\n\t' ), errDB.message );
      } );
    
    console.log( 'Successfully logged in as: ' + client.user.tag );
	}
}
