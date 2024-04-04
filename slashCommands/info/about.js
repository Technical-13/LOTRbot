const { ApplicationCommandType } = require( 'discord.js' );

module.exports = {
	name: "about",
	description: "Options to find the GitHub repository, report bugs, and suggest features!",
	type: ApplicationCommandType.ChatInput,
	options: [ {
    name: 'action',
    description: 'Link, Sponsor, Report Bug, Request Feature',
    type: 3,
    choices: [
      { name: 'Link', value: 'link' },
      { name: 'Sponsor', value: 'sponsor' },
      { name: 'Report Bug', value: 'bug' },
      { name: 'Request Feature', value: 'feature' }
    ] },
    {
      name: 'title',
      description: 'A short description of the bug or feature request',
      type: 3
    }
  ],
	cooldown: 2000,
	run: async ( client, interaction ) => {
		const strAction = ( interaction.options.get( 'action' ) ? ( interaction.options.get( 'action' ).value ?? 'link' ) : 'link' ) );
    var strTitle = ( interaction.options.get( 'title' ) ? ( interaction.options.get( 'title' ).value ?? '' ) : '' ) );
    if ( strTitle ) { strTitle = '&title=' + encodeURI( strTitle ); }
		switch ( strAction ) {
			case 'sponsor':
  			interaction.reply( { content: 'Sponsor me: [Paypal](<https://paypal.me/MagentaRV>) [CashApp](<https://cash.app/$MagentaRV>) [Venmo](<https://venmo.com/@MagentaRV)', ephemeral: interaction.inGuild() } );
  			break;
			case 'bug': 
  			interaction.reply( { content: 'Report a bug on GitHub:\n:link: <https://github.com/Technical-13/LOTRbot/issues/new?labels=bug&template=bug_report.md' + strTitle + '>', ephemeral: interaction.inGuild() } );
  			break;
			case 'feature':
  			interaction.reply( { content: 'Request a feature on GitHub:\n:link: <https://github.com/Technical-13/LOTRbot/issues/new?labels=enhancement&template=feature_request.md' + strTitle + '>', ephemeral: interaction.inGuild() } );
  			break;
			case 'link' : default :
		  	interaction.reply( { content: 'You can check me out on GitHub:\n:link: <https://github.com/Technical-13/LOTRbot/tree/main>', ephemeral: interaction.inGuild() } );
		}
	}
};
