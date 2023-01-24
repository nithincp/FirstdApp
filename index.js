import {ethers} from 'ethers'
import contractABI from './contractABI.json' assert { type: "json" }

const MoodContractAddress = "0x330e0DE6c30F532E5F40426d3d22C39d1a3F6A40"
const MoodContractABI = contractABI

let MoodContract
let signer

const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli")

provider.send("eth_requestAccounts",[]).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0])
        MoodContract = new ethers.Contract(MoodContractAddress,
            MoodContractABI,signer)
    })
})

async function getMood(){
    const getMoodPromise = MoodContract.getMood()
    const Mood = await getMoodPromise
    console.log(Mood)
}

async function setMood(){
    const mood = document.getElementById("mood").value
    const setMoodPromise = MoodContract.setMood(mood)
    await setMoodPromise
}