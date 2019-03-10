export const state = () => ({
    menus: [],
    menuId: null
});

export const getters = {
    currentMenu(state) {
        function traverse(menus, menuId) {
            for (let i = 0; i < menus.length; i++) {
                const current = menus[i];
                if (current.id === menuId) {
                    return current; 
                } else if (current.children) {
                    const found = traverse(current.children, menuId);
                    if (found) {
                        return found;
                    }
                }
            }
            return {};
        }
        return traverse(state.menus, state.menuId);
    }
};

export const mutations = {
    updateMenus(state, value) {
        state.menus = value;
    },
    updateMenuId(state, value) {
        state.menuId = value;
    }
};

export const actions = {
    async loadMenus({ commit }) {
        const menus = await this.$axios.$get('/api/menus');
        commit('updateMenus', menus);
    },
    showPage({ commit }, menu) {
        this.$router.push(menu.route);
        commit('updateMenuId', menu.id);
    }
};