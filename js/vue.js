const app= new Vue({
	el:'#filtros',
	data:{
		members: [],
		parties: [],
		states:[],
		estate: "All",
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
			app.parties = app.getKeyValue(app.members,"party")
			app.states = app.getKeyValue(app.members,"state")
		})
		.catch(function(error){
			console.log(error)
})
	},
	methods:{
	getKeyValue(array,key){
		let results = []
		array.forEach(e =>  !results.includes(e[key]) ? results.push(e[key]) : null)
			return results
		
	}
},
 computed: {
	 filtrito(){
		  return this.members.filter(e=>app.parties.includes(e.party) && (e.state == app.estate || app.estate =="All"))
	 }
	
},
})
