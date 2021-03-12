import { storage } from '@/util/storage'

const studio = {
    state: {
        studio_page_data: storage.get('studio_data')
    },
    mutations: {
        SET_studio_DATA: (state,data) => {
            storage.set("studio_data", data);
            state.studio_page_data = data;
            console.log(storage.get('studio_data'),66666);
        },
        REMOVE_DATA: (state,data) => {
            storage.remove('studio_data');
            state.studio_page_data = data;
        }
    },
    actions: {
        studioOpenNext({ commit }, data) {
            return new Promise((resolve, reject) => {
                console.log(data,56)
                commit('SET_studio_DATA', data)
                resolve()
            })
        },
        studioOutPage({ commit }) {
            return new Promise((resolve, reject) => {
                commit('REMOVE_DATA','')
                resolve()
            })
        }
    }
}
export default studio