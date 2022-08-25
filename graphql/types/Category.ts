
import { objectType, extendType, nonNull, stringArg } from 'nexus'

export const Category = objectType({
  name: 'Category',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('description')
    t.string('parentId')
    t.string('updatedAt')
    t.string('createdAt')
    // t.list.field('users', {
    //   type: User,
    //   async resolve(_parent, _args, ctx) {
    //     return await ctx.prisma.link
    //       .findUnique({
    //         where: {
    //           id: _parent.id,
    //         },
    //       })
    //       .users()
    //   },
    // })
  },
});
export const CategoryQuery = extendType({
    type: 'Query',
    definition(t) {
      t.nonNull.list.field('categories', {
        type: 'Category',
        resolve(_parent, _args, ctx) {
            
          return ctx.prisma.category.findMany()
        },
      })
    },
  })
export const CreateCategory= extendType({
    type:"Mutation",
    definition(t){
        t.nonNull.field('createCategory', {
            type: Category, 
            args:{
                name:nonNull(stringArg()),
                description: nonNull(stringArg()),
            },
            async resolve(_parent, _args, ctx){
                //check if user exists 
                const name = _args.name.toLowerCase().trim();
                const description = _args.description.toLowerCase().trim();
                const catExist =await ctx.prisma.category.findUnique({where:{name: name}});
                if(catExist){
                    throw new  Error("Category name already registered.");
                    
                }else{
                const newuser = {
                     name:name,
                     description:description,
                     parentId:""
                    };
                    const cat= await ctx.prisma.category.create({
                        data: newuser,
                    });
                    return cat;
                }
                
            }
        })
    }
});
export const EditCategory= extendType({
    type:"Mutation",
    definition(t){
        t.nonNull.field('editCategory', {
            type: Category, 
            args:{
                name:nonNull(stringArg()),
                description: nonNull(stringArg()),
                id: nonNull(stringArg())
            },
            async resolve(_parent, _args, ctx){
                const cat = await ctx.prisma.category.findUnique({where:{id:_args.id}});
                if(!cat){
                    throw new  Error("Category not exist.");
                }else{

                }
                //check if user exists 
                const name = _args.name.toLowerCase().trim();
                const description = _args.description.toLowerCase().trim();
                const catExist =await ctx.prisma.category.findUnique({where:{name: name}});
                if(catExist&& catExist.id!=cat.id){
                    
                       throw new  Error("Category name already registered.");
                    
                }else{
                    cat.name=name;
                    cat.description=description;
                       const cat1= await ctx.prisma.category.update({
                           where: {
                            id: cat.id
                           },
                           data: {
                            ...cat
                           },
                       });
                       return cat1;
                }
                
            }
        })
    }
});
export const DeleteCategory= extendType({
    type:"Mutation",
    definition(t){
        t.nonNull.field('deleteCategory', {
            type: Category, 
            args:{
                id: nonNull(stringArg())
            },
            async resolve(_parent, _args, ctx){
                const cat = await ctx.prisma.category.findUnique({where:{id:_args.id}});
                if(!cat){
                    throw new  Error("Category not exist.");
                }else{

                }    
                const cat1= await ctx.prisma.category.delete({
                    where: {
                    id: cat.id
                    },
                    
                });
                return cat1;
            }
        })
    }
});