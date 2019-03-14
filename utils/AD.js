const ldap = require('ldapjs');


function find(queryType, attributes) {

    return new Promise(function(resolve, reject) {

        let client = ldap.createClient({
            url: 'ldap://192.168.254.111'
        });

        client.bind('CN=Malik Henry,OU=Information Technology,OU=US,DC=BRITAX,DC=local', 'Computer1', function(err) {
            if(err) console.log(err);
            
            let opts = {
                filter: `(objectCategory=CN=${queryType},CN=Schema,CN=Configuration,DC=BRITAX,DC=local)`,
                scope: 'sub',
                paged: true,
                attributes: attributes,
        
            };
        
            client.search('dc=britax,dc=local', opts, function(err, resp) {
    
                let data = [];
    
                resp.on('searchEntry', function(entry) {
                    data.push(entry.object);
                });
                resp.on('searchReference', function(referral) {
                    console.log('referral: ' + referral.uris.join());
                });
                resp.on('error', function(err) {
                    client.unbind();
                    reject(err);
                });
                resp.on('end', function(result) {
                    console.log('status: ' + result.status);
                    client.unbind();
                    resolve(data);
                });
            });
        });
    }); 
}

function findUser(samName) {
    return new Promise(function(resolve, reject) {

        let client = ldap.createClient({
            url: 'ldap://192.168.254.111'
        });

        client.bind('CN=Malik Henry,OU=Information Technology,OU=US,DC=BRITAX,DC=local', 'Computer1', function(err) {
            if(err) console.log(err);
            
            let opts = {
                filter: `(&(sAMAccountName=${samName})(objectCategory=CN=Person,CN=Schema,CN=Configuration,DC=BRITAX,DC=local))`,
                scope: 'sub',
        
            };
        
            client.search('dc=britax,dc=local', opts, function(err, resp) {
    
                let data = [];
    
                resp.on('searchEntry', function(entry) {
                    console.log(entry);
                    
                    data.push(entry.object);
                });
                resp.on('searchReference', function(referral) {
                    console.log('referral: ' + referral.uris.join());
                });
                resp.on('error', function(err) {
                    client.unbind();
                    reject(err);
                });
                resp.on('end', function(result) {
                    console.log('status: ' + result.status);
                    client.unbind();
                    resolve(data);
                });
            });
        });
    }); 
}

  module.exports = { find, findUser };