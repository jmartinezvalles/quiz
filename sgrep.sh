for i in `find . -name "*.*js" | grep -v "node_modules"` 
do
	grep -H "author" $i
done	
