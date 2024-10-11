export const post = (url,opts) =>{
    return new Promise((resolve, reject) => {
        fetch(url,{
            method:'POST',
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify(opts)
          })
          .then(res => res.json())
          .then(res => {
            resolve(res);
          }).catch(err => {
            reject(err);
          });
    })
}

export const get = (url,opts) =>{
    return new Promise((resolve, reject) => {
        fetch(url)
          .then(res => res.json())
          .then(res => {
            resolve(res);
          }).catch(err => {
            reject(err);
          });
    })
}
