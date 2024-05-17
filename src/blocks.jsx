export const inputPort = { 
    type: 'input',
    name: 'in1',
    value: 10,
    ports: {
        in: [],
        out: { x: 0, y: 0  }
    },
    x: 50, y: 50,
    width: 40, height: 20,
    solve: function (){ return this.value }
};

export const gain = { 
    type: 'gain',
    name: 'Gain1',
    value: 5,
    ports: {
        in:  [{ x: 0, y: 0, link: null }],
        out: { x: 0, y: 0 }
    },
    x: 250, y: 50,
    width: 40, height: 20,
    solve: function(){
        return this.ports.in[0].link?.solve ? this.value * this.ports.in[0].link.solve() : "not gain input"
    }
};

export const add = { 
    type: 'add',
    name: 'Add1',
    value: 0,
    ports: {
        in:  [
                { x: 0, y: -5, link: null },
                { x: 0, y: +5, link: null }
            ],
        out: { x: 0, y: 0 }
    },
    x: 250, y: 140,
    width: 40, height: 20,
    solve: function(){
        return this.ports.in[0].link?.solve ? this.value * this.ports.in[0].link.solve() : "not gain input"
    }
};

export const outputPort = { 
    type: 'output',
    name: 'Out1',
    value: 0,
    ports: {
        in:  [{ x: 0, y: 0, link: null }],
        out: null
    },
    x: 350, y: 50,
    width: 40, height: 20,
    solve: function(){ 
        this.value = this.ports?.in[0]?.link?.solve ? this.ports.in[0].link.solve() : "Not computed"
    }
};