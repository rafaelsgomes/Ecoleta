function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res=> res.json()).then( states =>{
        for (state of states){
            ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`
        } 
    })
}
populateUfs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = ""
    citySelect.disabled = true
    fetch(url).then(res=> res.json()).then( cities =>{
        for (city of cities){
            citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`
        }
        citySelect.disabled = false
    })
}
document.querySelector("select[name=uf]").addEventListener("change", getCities)

//Ítens de coleta

const itensToCollect = document.querySelectorAll('.items-grid li')

const colletctItems = document.querySelector('input[name=items]')

let selectedItems = []

for( item of itensToCollect){
    item.addEventListener('click', handleSelectedItem)
}

function handleSelectedItem(event){
    const itemLi = event.target
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
// Verifica se já foi selecionado
    const alReadySelected = selectedItems.findIndex( item=>{
        return itemFound = item == itemId
    })
// Remove se tiver selecionado
    if(alReadySelected >= 0){
        const filteredItems = selectedItems.filter( item=> {
            return itemIsDifferent = item != itemId
        })
        selectedItems = filteredItems
    } else {
// Adiciona se não tiver selecionado
        selectedItems.push(itemId)
    }
// Atualiza o input:hidden
    colletctItems.value = selectedItems
}