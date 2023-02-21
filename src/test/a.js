let a = 1

const test = () => {
    a++
}
const answer = () => {
    console.log(a)
}
let obj = {
    test,
    answer
}
export {
    test,
    answer
};
export default obj
