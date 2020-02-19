function request(){
// variables
const members = data.results[0].members
const tablita = document.getElementById("primera")
const tabla = document.getElementById("segunda")
const tablon = document.getElementById("tercera")
const tablazo = document.getElementById("cuarta")
const tabloide= document.getElementById("quinta")
 // funciones 
members.forEach(e=>{
	if (e.party == "D"){
		stats.demo_Mvotes+=e.missed_votes_pct
		stats.demo_votes_party+=e.votes_with_party_pct
		stats.democrat++
}
	else if(e.party == "R"){
		stats.repu_Mvotes+=e.missed_votes_pct
		stats.repu_votes_party+=e.votes_with_party_pct
		stats.republican++
	}
	else{
		stats.inde_Mvotes+=e.missed_votes_pct
		stats.inde_votes_party+=e.votes_with_party_pct	
		stats.independent++
	}
}
)

stats.total = members.length
stats.d_total_votes = +((stats.demo_votes_party / stats.democrat).toFixed(2))
stats.r_total_votes = +((stats.repu_votes_party / stats.republican).toFixed(2))
stats.i_total_votes = stats.independent !== 0 ? +((stats.inde_votes_party / stats.independent).toFixed(2))	: "-"
stats.total_votes = +(stats.d_total_votes + stats.r_total_votes + stats.i_total_votes)

// estructura de las tablas
tablita.innerHTML=`
<tr>

<td>Democrats</td>
	<td>${stats.democrat}</td>
	<td>${stats.d_total_votes}%</td>
	</tr>
	<tr>
	<td>Republicans</td>
	<td>${stats.republican}</td>
	<td>${stats.r_total_votes}%</td>
	</tr>
	<tr>
	<td>Independent</td>
	<td>${stats.independent}</td>
	<td>${stats.i_total_votes}%</td>
	</tr>
	<tr>
	<td>Total</td>
	<td>${stats.total}</td>
	<td></td>
	</tr>
	`
if(tabla == null && tablon == null){
let order =members.filter(e => e.total_votes != 0).slice()
 order.sort(function(a,b){
	return a.votes_with_party_pct - b.votes_with_party_pct
})

let pct = Math.round(order.length*0.1)
 stats.least_loyal = order.slice(-pct).reverse()
stats.most_loyal = order.slice(0,pct)
stats.least_loyal = order.slice(-pct).reverse()
stats.most_loyal.forEach(e=>{
	
	let row = tablazo.insertRow(-1)

	row.innerHTML =`
     <td>${e.last_name} ${e.first_name}</td>
     <td>${Math.round((e.votes_with_party_pct*(e.total_votes-e.missed_votes))/100)}</td>
     <td>${e.votes_with_party_pct}%</td>
	`
})
stats.least_loyal.forEach(e=>{
	let row = tabloide.insertRow(-1)

	row.innerHTML =`
     <td>${e.last_name} ${e.first_name}</td>
     <td>${Math.round((e.votes_with_party_pct*(e.total_votes-e.missed_votes))/100)}</td>
     <td>${e.votes_with_party_pct}%</td>
	`
})

}	

else if (tablazo ==null && tabloide == null){
 let orden =members.filter(e => e.total_votes != 0).slice()
orden.sort(function(a,b){
	return a.missed_votes_pct - b.missed_votes_pct
})
let pct = Math.round(orden.length*0.1)
stats.most_engaged = orden.slice(0,pct)
stats.least_engaged = orden.slice(-pct).reverse()
 stats.least_engaged.forEach(e=>{
	let row = tabla.insertRow(-1)

	row.innerHTML =`
     <td>${e.last_name} ${e.first_name}</td>
     <td>${e.missed_votes}</td>
     <td>${e.missed_votes_pct}%</td>
	`
})
stats.most_engaged.forEach(e=>{
	let row = tablon.insertRow(-1)

	row.innerHTML =`
     <td>${e.last_name} ${e.first_name}</td>
     <td>${e.missed_votes}</td>
     <td>${e.missed_votes_pct}%</td>
	`
})
}
}

