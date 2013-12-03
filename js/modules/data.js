define([''], function(){
	
	var dataObj = 
		{
			clauses: [
				// COMPANY NAMING CLAUSE
				{
					name: "companyNaming",
					readableName: "Company Naming",
					vars: {
						companyName:{
							label: "What is the name of your company?",
							value: "Company Name",
						},
						companyAddress:{
							label: "What is the address of your company?",
							value: "Company Address"
						}
					},
					clause: "[[companyName]] of [[companyAddress]] (subsequently to be referred to as The Label)",
					translation: "This is just saying that everytime the word company comes up from here on in, it will refer to [[companyName]] who are located at [[companyAddress]]."
				},

				//ARTIST NAMING CLAUSE
				{
					name: "artistNaming",
					readableName: "Company Naming",
					vars: {
						artistName:{
							label: "What is the artist's (real) name?",
							value: "Artist Name",
						},
						artistAddress:{
							label: "Where does the artist live?",
							value: "Artist Address"
						}
					},
					clause: "Professionally known as [[artistName]] (subsequently to be referred to as the Artist)",
					translation: "translation here [[artistName]]"
				},
			
				// MINIMUM COMMITMENT CLAUSE
				{
					name: "minimumCommitment",
					readableName: "Company Naming",
					vars: {
						releaseFormat:{
							label: "What will the format of the release be?",
							value: "Release Format",
							dropdown: [
								"Single",
								"EP",
								"LP"
							]
						},
						releaseTitle:{
							label: "What is the title of the release?",
							value: "Release Title"
						},
						releaseDate:{
							label: "What is the release date?",
							value: "Release Date",
							type: "dateField"
						},
					},
					clause: "The Minimum Commitment shall be a newly recorded [[releaseFormat]] entitled [[releaseTitle]], promotional video and any additional or bonus recordings as mutually agreed between the parties or otherwise delivered to the Label by the Artist.  The Artist must deliver the Masters on or before: [[releaseDate]]",
					translation: "XXXXXX"
				},

				// TERRITORY CLAUSE
				{
					name: "territory",
					readableName: "Company Naming",
					vars: {
						territory:{
							label: "In what territories will this contract be effective?",
							value: "Territory",
						}
					},
					clause: "[[territory]]",
					translation: "XXXXXX"
				},

				// MASTERS CLAUSE
				{
					name: "masters",
					readableName: "Company Naming",
					vars: {
						exclusivityPeriod:{
							label: "How long will your company want exclusive rights over the masters?",
							value: "10 Months",
						}
					},
					clause: "Master\(s\) shall mean the sound recording\(s\) featuring the performance of the Artist delivered to Silo by the Artist hereunder.  Silo shall in respect of each Master delivered hereunder be exclusively entitled to control and exploit all copyright in that Master for a period of [[exclusivityPeriod]] from the date of release of that Master (Exclusive Period), and thereafter to continue to exploit the Masters on a non-exclusive basis in perpetuity. For the avoidance of doubt the rights granted to Silo include the right to sell copies of the Master in all formats, license the Master for synchronisation, make remixes and make all other forms of exploitation – subject to the approvals set out in clause 8. Silo shall be exclusively entitled to collect any and all performance, broadcast and communication income relating to the Master in Australia and New Zealand in perpetuity. The Artist agrees that the Master shall be mastered and delivered to Silo in an agreed format at the Artist’s sole expense.  After the Exclusive Period has ended the Artist may release/include a Master on other releases by the Artist or as a party of a third party release.",
					translation: "XXXXXX"
				},

				// WORKS CLAUSE
				{
					name: "test",
					readableName: "Company Naming",
					switchable: "enabled",
					vars: {
						territory:{
							label: "In what territories will this contract be effective?",
							value: "Territory",
						}
					},
					clause: "[[territory]]",
					translation: "XXXXXX"
				},

			]
		}

	return dataObj
})

