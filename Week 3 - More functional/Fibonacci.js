const fibonacci_like = function (a, b){
    const pito = function (n) { 
        if (n === 0){
            return a;
        }if (n === 1) {
            return b;
        } else {
            return pito(n-1) + pito(n-2); 
        }
    }
    return function (n){
        if (n === 0){
            return a;
        }if (n === 1) {
            return b
        } else {
                return pito(n);
        }
    }
}
;debugger;