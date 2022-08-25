import { objectType } from "nexus";

export const ResponseType= objectType({
    name: 'ResponseType',
    definition(t){
        t.string('data');
        t.string('message');
        t.string('status')
        
    }
});