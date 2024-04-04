module.exports = {	
  /*
  	new SlashCommandBuilder()
    .setName( 'roll' )
    .setNameLocalizations( {
      de: 'würfeln',
      fr: 'lancer-les-dés',
      fi: 'heitä-noppaa',
      pl: 'rzuć-kostką',
      'sv-SE': 'rulla-tärningen' } )
   */
  name: "roll", // Command name
	description: "Dice Roller", // Set the description
	type: ApplicationCommandType.ChatInput,
	options: [ {
    name: 'dice',
    description: 'How many dice? (default: 1)',
    type: 4
  }, {
    name: 'sides',
    description: 'How many sides per die? (default: 6)',
    type: 4
  }, {
    name: 'sets',
    description: 'How many sets of dice? (default: 1)',
    type: 4
  }, {
    name: 'modifier',
    description: '± to final roll for each die? (default: 0)',
    type: 4
  } ],
	cooldown: 1000, // Set a cooldown of 1 second
	async run( interaction, client ) {
    const myOwner = client.users.cache.get( process.env.OWNER_IDS.split( ';' )[ 0 ] );
    
    const intSets = ( interaction.options.get( 'sets' ) ? ( interaction.options.get( 'sets' ).value || 1 ) : 1 );
    const intDice = ( interaction.options.get( 'dice' ) ? ( interaction.options.get( 'dice' ).value || 1 ) : 1 );
    const intSides = ( interaction.options.get( 'sides' ) ? ( interaction.options.get( 'sides' ).value || 6 ) : 6 );
    const intMod = ( interaction.options.get( 'modifier' ) ? ( interaction.options.get( 'modifier' ).value || 0 ) : 0 );

//    var objSets = {};
    var intRollTotal = 0;
    var strRollTotal = ( intSets > 1 ? intSets + '#' : '' ) + ( intDice > 1 ? intDice : '' ) + 'd' + intSides + ( intMod != null ? ( intMod < 0 ? ' ' : ' +' ) + intMod : '' ) + ':';

    for ( var set = 1; set <= intSets; set++ ) {
//      var arrRolls = [];
      var intRollSubtotal = 0;
      var strRollSubtotal = '\n\t(';
      
      for ( var die = 1; die <= intDice; die++ ) {
        var result = Math.floor( Math.random() * intSides ) + 1;
        intRollSubtotal += result;      
        if ( die < intDice ) { strRollSubtotal += result + ') + ('; }
        else { strRollTotal += strRollSubtotal + result + ')'; }
//        arrRolls.push( result );
      }

      if ( intMod != null && intMod !== 0 ) {
        intRollSubtotal += intMod;
        strRollTotal += ( intMod < 0 ? ' ' : ' +' ) + intMod;
      }
      strRollTotal += ' = ' + intRollSubtotal;

      intRollTotal += intRollSubtotal;

//      objSets[ set ] = { rolls: arrRolls, mod: intMod, sum: intRollSubtotal };
    }

    if ( intSets > 1 ) {
      strRollTotal += '\nTotal: ' + intRollTotal;
    }

    interaction.reply( { content: strRollTotal } );
	}
}
