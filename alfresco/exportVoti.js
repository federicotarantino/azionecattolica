var nodes = search.query({
  language: "fts-alfresco",
  query: "+ANCESTOR:'workspace://SpacesStore/e313b3f8-e3c1-462b-b935-65b92a29bd47' AND TYPE:'cm:content'"
});
for(var n in nodes){
  var node = nodes[n], name = node.name.split("_");
  print(node.parent.properties["cm:title"]+";"+node.parent.id+";"+name[1]+";"+node.properties["cm:description"]);
}
