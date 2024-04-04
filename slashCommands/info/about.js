module.exports = {
	name: "bot",
	description: "Options to find the GitHub repository, report bugs, and suggest features!",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	async run( interaction, client ) {
		const strAction = ( interaction.options.getString( 'action' ) ?? 'link' );
    var strTitle = ( interaction.options.getString( 'title' ) ?? '' );
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
}
