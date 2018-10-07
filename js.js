$global.$js = function() {

    this.id = 0;
    this.schemas = {};

    this.clone = function(o) {
        return JSON.parse(JSON.stringify(o));
    };

    this.compile = function(name, proto, delegate) {

        $js.schemas[name] = { proto: proto, delegate: delegate };

        eval("$global['" + name + "'] = function " + name + "() { this.__key__ = '" + name + "'; if (this.__schema__ == undefined) { this.__schema__ = '" + name + "'; $js.generate(this); } $js.instantiate(this); };");

    };

    this.generate = function(instance) {

        $js.id++;

        instance.__public__ = { __virtuals__: {}, __extensions__: {} };
        instance.__private__ = {};
        instance.__protected__ = { __virtuals__: {}, __extensions__: {} };
        instance.__self__ = {};
        instance.__self__.__id__ = $js.id;

        instance.__public_schema__ = { field: {}, func: {}, void: {}, delegate: {}, virtual: { func: {}, void: {} }, override: { func: {}, void: {} }, extension: { func: {}, void: {} } };
        instance.__private_schema__ = { field: {}, func: {}, void: {} };
        instance.__protected_schema__ = { field: {}, func: {}, void: {}, delegate: {}, virtual: { func: {}, void: {} }, override: { func: {}, void: {} }, extension: { func: {}, void: {} } };

    };

    this.instantiate = function(instance) {

        let proto = $js.schemas[instance.__key__].proto;
        let delegate = $js.schemas[instance.__key__].delegate;

        if (proto != null)
            proto.call(instance);
            
        delegate(instance.__public_schema__, instance.__private_schema__, instance.__protected_schema__, instance.__self__);

        $js.build(instance);
        
        for (let key in instance.__public__) {
            if (key != "__virtuals__" && key != "__extensions__")
                instance[key] = instance.__public__[key];
        }

        if ($js.schemas[instance.__schema__].proto == null) {

            delete instance.__key__;

            delete instance.__public_schema__;
            delete instance.__private_schema__;
            delete instance.__protected_schema__;

            if (instance.on_build != null) { 
                instance.on_build(); 
            }

        }

        if (proto != null && proto.name == $js.schemas[instance.__schema__].proto.name) {
            
            delete instance.__key__;

            delete instance.__public_schema__;
            delete instance.__private_schema__;
            delete instance.__protected_schema__;

            if (instance.on_build != null) { 
                instance.on_build(); 
            }

        }

    };

    this.build = function(instance) {

        for (let key in instance.__public_schema__.field) {
            instance.__public__[key] = instance.__public_schema__.field[key];
            instance.__self__[key] = instance.__public_schema__.field[key];
        }

        for (let key in instance.__public_schema__.func) {
            instance.__public__[key] = instance.__public_schema__.func[key];
            instance.__self__[key] = instance.__public_schema__.func[key];
        }

        for (let key in instance.__public_schema__.void) {
            instance.__public__[key] = instance.__public_schema__.void[key];
            instance.__self__[key] = instance.__public_schema__.void[key];
        }

        for (let key in instance.__public_schema__.delegate) {
            instance.__public__[key] = instance.__public_schema__.delegate[key];
            instance.__self__[key] = instance.__public_schema__.delegate[key];
        }

        for (let key in instance.__public_schema__.virtual.func) {
            instance.__public__.__virtuals__[key] = instance.__public_schema__.virtual.func[key];
            instance.__public__[key] = instance.__public_schema__.virtual.func[key];
            instance.__self__[key] = instance.__public_schema__.virtual.func[key];
        }

        for (let key in instance.__public_schema__.virtual.void) {
            instance.__public__.__virtuals__[key] = instance.__public_schema__.virtual.void[key];
            instance.__public__[key] = instance.__public_schema__.virtual.void[key];
            instance.__self__[key] = instance.__public_schema__.virtual.void[key];
        }

        for (let key in instance.__public_schema__.extension.func) {
            
            if (instance.__public__.__extensions__[key] == null) 
                instance.__public__.__extensions__[key] = [];

            instance.__public__.__extensions__[key].push(instance.__public_schema__.extension.func[key]);
            
            eval("instance.__public__['" + key + "'] = function() { instance.__public__.__virtuals__['" + key + "'](); for (var index in instance.__public__.__extensions__['" + key + "']) instance.__public__.__extensions__['" + key + "'][index](); }");
            eval("instance.__self__['" + key + "'] = function() { instance.__public__.__virtuals__['" + key + "'](); for (var index in instance.__public__.__extensions__['" + key + "']) instance.__public__.__extensions__['" + key + "'][index](); }");

        }

        for (let key in instance.__public_schema__.extension.void) {
            
            if (instance.__public__.__extensions__[key] == null) 
                instance.__public__.__extensions__[key] = [];

            instance.__public__.__extensions__[key].push(instance.__public_schema__.extension.void[key]);
            
            eval("instance.__public__['" + key + "'] = function() { instance.__public__.__virtuals__['" + key + "'](); for (var index in instance.__public__.__extensions__['" + key + "']) instance.__public__.__extensions__['" + key + "'][index](); }");
            eval("instance.__self__['" + key + "'] = function() { instance.__public__.__virtuals__['" + key + "'](); for (var index in instance.__public__.__extensions__['" + key + "']) instance.__public__.__extensions__['" + key + "'][index](); }");

        }

        for (let key in instance.__public_schema__.override.func) {
            instance.__public__[key] = instance.__public_schema__.override.func[key];
            instance.__self__[key] = instance.__public_schema__.override.func[key];
        }

        for (let key in instance.__public_schema__.override.void) {
            instance.__public__[key] = instance.__public_schema__.override.void[key];
            instance.__self__[key] = instance.__public_schema__.override.void[key];
        }


        
        for (let key in instance.__private_schema__.field) {
            instance.__private__[key] = instance.__private_schema__.field[key];
            instance.__self__[key] = instance.__private_schema__.field[key];
        }

        for (let key in instance.__private_schema__.func) {
            instance.__private__[key] = instance.__private_schema__.func[key];
            instance.__self__[key] = instance.__private_schema__.func[key];
        }

        for (let key in instance.__private_schema__.void) {
            instance.__private__[key] = instance.__private_schema__.void[key];
            instance.__self__[key] = instance.__private_schema__.void[key];
        }

        for (let key in instance.__private_schema__.delegate) {
            instance.__private__[key] = instance.__private_schema__.delegate[key];
            instance.__self__[key] = instance.__private_schema__.delegate[key];
        }



        for (let key in instance.__protected_schema__.field) {
            instance.__protected__[key] = instance.__protected_schema__.field[key];
            instance.__self__[key] = instance.__protected_schema__.field[key];
        }

        for (let key in instance.__protected_schema__.func) {
            instance.__protected__[key] = instance.__protected_schema__.func[key];
            instance.__self__[key] = instance.__protected_schema__.func[key];
        }

        for (let key in instance.__protected_schema__.void) {
            instance.__protected__[key] = instance.__protected_schema__.void[key];
            instance.__self__[key] = instance.__protected_schema__.void[key];
        }

        for (let key in instance.__protected_schema__.delegate) {
            instance.__protected__[key] = instance.__protected_schema__.delegate[key];
            instance.__self__[key] = instance.__protected_schema__.delegate[key];
        }

        for (let key in instance.__protected_schema__.virtual.func) {
            instance.__protected__.__virtuals__[key] = instance.__protected_schema__.virtual.func[key];
            instance.__protected__[key] = instance.__protected_schema__.virtual.func[key];
            instance.__self__[key] = instance.__protected_schema__.virtual.func[key];
        }

        for (let key in instance.__protected_schema__.virtual.void) {
            instance.__protected__.__virtuals__[key] = instance.__protected_schema__.virtual.void[key];
            instance.__protected__[key] = instance.__protected_schema__.virtual.void[key];
            instance.__self__[key] = instance.__protected_schema__.virtual.void[key];
        }

        for (let key in instance.__protected_schema__.extension.func) {
            
            if (instance.__protected__.__extensions__[key] == null) 
                instance.__protected__.__extensions__[key] = [];

            instance.__protected__.__extensions__[key].push(instance.__protected_schema__.extension.func[key]);
            
            eval("instance.__protected__['" + key + "'] = function() { instance.__protected__.__virtuals__['" + key + "'](arguments[0]); for (var index in instance.__protected__.__extensions__['" + key + "']) instance.__protected__.__extensions__['" + key + "'][index](arguments[0]); }");
            eval("instance.__self__['" + key + "'] = function() { instance.__protected__.__virtuals__['" + key + "'](arguments[0]); for (var index in instance.__protected__.__extensions__['" + key + "']) instance.__protected__.__extensions__['" + key + "'][index](arguments[0]; }");

        }

        for (let key in instance.__protected_schema__.extension.void) {
            
            if (instance.__protected__.__extensions__[key] == null) 
                instance.__protected__.__extensions__[key] = [];

            instance.__protected__.__extensions__[key].push(instance.__protected_schema__.extension.void[key]);
            
            eval("instance.__protected__['" + key + "'] = function() { instance.__protected__.__virtuals__['" + key + "'](arguments[0]); for (var index in instance.__protected__.__extensions__['" + key + "']) instance.__protected__.__extensions__['" + key + "'][index](arguments[0]); }");
            eval("instance.__self__['" + key + "'] = function() { instance.__protected__.__virtuals__['" + key + "'](arguments[0]); for (var index in instance.__protected__.__extensions__['" + key + "']) instance.__protected__.__extensions__['" + key + "'][index](arguments[0]); }");

        }

        for (let key in instance.__protected_schema__.override.func) {
            instance.__protected__[key] = instance.__protected_schema__.override.func[key];
            instance.__self__[key] = instance.__protected_schema__.override.func[key];
        }

        for (let key in instance.__protected_schema__.override.void) {
            instance.__protected__[key] = instance.__protected_schema__.override.void[key];
            instance.__self__[key] = instance.__protected_schema__.override.void[key];
        }

    };

};
$global.$js = new $js();