const vue = Vue.createApp({
    data() {
        return { 
            theaterInModal : {name: null},
            theaters:  []
            
    }
},
async created() {
    this.theaters = await (await fetch('http://localhost:8080/theaters')).json();
},
methods: {
    getTheater : async function(id){
        this.theaterInModal = await (await fetch(`http//localhost:8080/theaters/${id}`)).json();
        let theaterInfoModal = new bootstrap.Modal(document.getElementById('theaterInfoModal'), {})
        theaterInfoModal.show();
    }
}
}).mount('#app')