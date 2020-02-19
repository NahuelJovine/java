function request(){
const body = document.querySelector("tbody") 
const members = data.results[0].members
members.forEach(members=>{
	if(members.middle_name==null){
		members.middle_name=" ";
	}
	let row = body.insertRow(-1);
	row.innerHTML= "<td><a href='"+members.url+"'>"+members.last_name+'  '+members.first_name+'  '+members.middle_name+"</a></td><td>"+members.party+"</td><td>"+members.state+"</td><td>"+members.seniority+"</td><td>"+members.votes_with_party_pct+"</td>"
} 
)
function filtrada(){
	body.innerHTML=""
	let estadito = []
	let party =[]
	const sel =document.getElementById("select").value
	const label = document.getElementsByClassName("box")
	for (i=0;i<label.length;i++){
		if(label[i].checked){
			party = members.filter(members=> members.party==label[i].value)
			members.filter(members=> members.party==label[i].value && (sel==members.state || sel=="all")).forEach(members=>{
				if(members.middle_name==null){
					members.middle_name=" ";
				}
				let row = body.insertRow(-1);
				row.innerHTML= "<td><a href='"+members.url+"'>"+members.last_name+'  '+members.first_name+'  '+members.middle_name+"</a></td><td>"+members.party+"</td><td>"+members.state+"</td><td>"+members.seniority+"</td><td>"+members.votes_with_party_pct+"</td>"
			} 
			)
		}
		party.forEach(e=>{
			if (estadito.indexOf(e.state)==(-1)){
				estadito.push(e.state)
			}
		}
		)
		document.getElementById("select").innerHTML=`<option value="all">All</option>`
		estadito.forEach(e=>{
			document.getElementById("select").innerHTML+=`<option value="${e}">${e}</option>`
			document.getElementById("select").value=sel
		}
		)		
	}
}
document.getElementById("d").addEventListener("click",filtrada)
document.getElementById("r").addEventListener("click",filtrada)
document.getElementById("i").addEventListener("click",filtrada)
document.getElementById("select").addEventListener("change",filtrada)
}