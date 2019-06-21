Vue.component('all-logo', {
    data: function(){
        return{
            pictures: [
                {
                url : "https://cdn.dribbble.com/users/2146089/screenshots/6659108/libro_2x.png"
            },
            {
                url : "https://cdn.dribbble.com/users/1579320/screenshots/6658338/event_manager_shot-ugem_1x.png"
            },
            {
                url : "https://cdn.dribbble.com/users/203446/screenshots/6655885/dribbble_mockup_june_8__1__1x.png"
            },
            {   
                url : "https://cdn.dribbble.com/users/2007356/screenshots/6654840/magazine_store_02_1x.png"
            },
            {
                url : "https://cdn.dribbble.com/users/63973/screenshots/6659155/vertobase_brand_overview_1x.png"
            }
        ]
        }
    },
    template:`
    
    `
})

Vue.component('form-input',{
    data(){
        return{
            text: '',
            logoUrl: [
                {
                    url : "https://cdn.dribbble.com/users/2146089/screenshots/6659108/libro_2x.png"
                },
                {
                    url : "https://cdn.dribbble.com/users/1579320/screenshots/6658338/event_manager_shot-ugem_1x.png"
                },
                {
                    url : "https://cdn.dribbble.com/users/203446/screenshots/6655885/dribbble_mockup_june_8__1__1x.png"
                },
                {   
                    url : "https://cdn.dribbble.com/users/2007356/screenshots/6654840/magazine_store_02_1x.png"
                },
                {
                    url : "https://cdn.dribbble.com/users/63973/screenshots/6659155/vertobase_brand_overview_1x.png"
                }
            ]
        }
    },
    methods:{
        createLogo(){
            console.log("ke trigger")
        }
    },
    template:`
    <div>
        <form @submit.prevent="createLogo">
            <div class="form-group row">
                <label for="inputText" class="col-sm-2 col-form-label">Text</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputText" placeholder="Text" style="width:25%;">
                </div>
            </div>
            <div class="form-group row" >
                <label for="inputLogo" class="col-sm-2 col-form-label">Logo</label>
                <div class="col-sm-10" v-for="logo in logoUrl">
                    <a>
                        
                            <img :src="logo.url" style="width:10%;">
                        
                    </a>
                </div>
            </div>
            <button type="submit" class="btn btn-primary" >Submit</button>
        </form>
    </div>
    `
})


new Vue({ 
    el: '#main' ,
    data: {
        statusPage: 'main',
        text:'',
        iconLogo:''
    },
    mounted(){
        axios({
            url:`https://api.iconfinder.com/v3/icons/search?query=${this.iconLogo}&premium=1&count=30`,
            method:'GET'
        })
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    methods: {
        home(){
            this.statusPage='all-logo'
        },
        userLogo(){
            this.statusPage='all-logo'
        },
        create(){
            this.statusPage='createNew'
        }
    }
})