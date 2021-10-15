import rewire from "rewire"
const index = rewire("./index")
const test = index.__get__("test")
// @ponicode
describe("test", () => {
    test("0", () => {
        let callFunction: any = () => {
            test({ test: "Pierre Edouard" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            test({ test: "Michael" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            test({ test: "Anas" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            test({ test: "Edmond" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            test({ test: "George" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            test({ test: "" })
        }
    
        expect(callFunction).not.toThrow()
    })
})
