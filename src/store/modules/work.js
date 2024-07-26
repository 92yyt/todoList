const state = {
    workList: JSON.parse(localStorage.getItem('workList')) || []
};
  
const mutations = {
    addWork(state, work) {
        state.workList.push(work);
        localStorage.setItem('workList', JSON.stringify(state.workList));
    },
    updateWork(state, works){
        state.workList = works
        localStorage.setItem('workList', JSON.stringify(state.workList));
    }
};

const actions = {
    addWork({ commit }, work) {
        commit('addWork', work);
    },
    updateWork({ commit }, works){
        commit('updateWork',works)
    }
};

const getters = {
    workList: (state) => state.workList
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
  