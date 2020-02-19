const app = new Vue({
	el:'#table',
	data:{
		members: [],
		filter:[],
		parties:0,
		democrats:0,
		d_votes:0,
		d_total_votes:0,
		independents:0,
		i_votes:0,
		i_total_votes:0,
		republicans:0,
		r_votes:0,
		r_total_votes:0,
		least_engaged:[],
		least_loyal:[],
		most_engaged:[],
		most_loyal:[],
		url: document.querySelector("#senators") ? "https://api.propublica.org/congress/v1/113/senate/members.json" : "https://api.propublica.org/congress/v1/113/house/members.json",
		init: {
    method: 'GET',
	headers: { 'x-API-Key':"awbBFGuZQfv8WJlrh48R2CsnxWAbodebq2XDR8B7" }
}
	},
	created(){
		fetch(this.url, this.init)
		.then(function(res){
			if(res.ok){
				return res.json()
			} else{
				throw new Error(res.status)
			}
		})
		.then(function(json){
			app.members = json.results[0].members
			app.filter = app.getKeyValue(app.members,"party")
			app.least_engaged = app.pct(app.members,"missed_votes_pct",false)
			app.most_engaged = app.pct(app.members,"missed_votes_pct",true)
			app.most_loyal = app.pct(app.members,"votes_with_party_pct",false)
			app.least_loyal = app.pct(app.members,"votes_with_party_pct",true)
		})
		.catch(function(error){
			console.log(error)
})
	},
	methods:{
	getKeyValue(array,key){
		array.forEach(e => {
			app.parties++
			if(e[key] == "D"){
				app.democrats++
				app.d_votes+=e.votes_with_party_pct
				app.d_total_votes= +((app.d_votes/app.democrats)).toFixed(2)
			}
			else if(e[key] == "R"){
				app.republicans++
				app.r_votes+=e.votes_with_party_pct
				app.r_total_votes= +((app.r_votes/app.republicans)).toFixed(2)
			}
			else{
				app.independents++
				app.i_votes+=e.votes_with_party_pct
				app.i_total_votes= app.independents !==0 ? +((app.i_votes/app.independents)).toFixed(2) : "-"
			}
		})
	},	
	pct(array,key,isAscendant){
		if(array.length == 0){
			return []
		}
		let result
		let i
		let aux= isAscendant?
		[...array].sort((a,b) => a[key] - b[key])
		:
		[...array].sort((a,b) => b[key] - a[key])

		let tenpct= Math.round(aux.length*0.1)
		
		result =aux.slice(0,tenpct)

		i=result.length

		while(aux[i][key] == result[result.length - 1][key] && i < aux.length){
			result.push(aux[i])
			i++
		}

		return result
	}
},

})
