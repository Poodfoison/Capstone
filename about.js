const listOfeatures = [
    {
        feature :"Provides notifications for any updates like meetings and news around the community.",
    },
    {
        feature :"Where homeowners send their concerns to."
    }, 
    {
        feature :"In which the homeowners can be able to check on the monthly bills through the app.",
    }, 
    {
        feature :"Where you can register and inform that the homeowner will be having visitors.",
    }, 
    {
        feature :"This will also contact and alert security incase of emergencies or if there are concerns.",
    }, 
]


for (let i = 0; i < listOfeatures.length; i++) 
{

    const features = document.getElementById(`feature${i+1}`)
    features.innerHTML = listOfeatures[i].feature;
}


