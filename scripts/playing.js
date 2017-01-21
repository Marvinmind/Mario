/**
 * Created by martin on 20.01.17.
 */
function Animal(name){
    this.name = name
    prototype = this
}

fluffy = new Animal('fluffy')
console.log(fluffy.name)