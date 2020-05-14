import Mock from 'mockjs2'
import { builder } from '../util'

const Home = (options) => {
    const result={
        "msg":"",
        "data":[
            {"icon":"/img/file.png"}
        ]
    }
    return builder(result)
}


Mock.mock(/\/api\/Home/, 'post', Home)

