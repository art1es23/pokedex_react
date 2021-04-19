const getVars = () => {
    const COLORS = {
        fire: '#FF5300',
        grass: '#FF5300',
        electric: '#5ED1BA',
        water: '#1240AB',
        ground: '#A64B00',
        rock: '#6A8D8D',
        fairy: '#6AFF00',
        poison: '#00FF00',
        bug: '#BC00FF',
        dragon: '#FFE340',
        physic: '#FF40FF',
        flying: '#69C9BC',
        fighting: '#A60004',
        normal: '#FFFFFF'
    };

    const COLORS_KEYS = Object.keys(COLORS);
    const COLORS_VALUES = Object.values(COLORS);
}

export default getVars;