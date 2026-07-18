import pymysql

c = pymysql.connect(host='localhost', user='root', password='Arul2001', database='bigbean_cafe')
cur = c.cursor()

# Add category_id if it does not exist
cur.execute('DESCRIBE merchandise')
has_category_id = any(row[0] == 'category_id' for row in cur.fetchall())
if not has_category_id:
    cur.execute('ALTER TABLE merchandise ADD COLUMN category_id INT NULL AFTER category')
    print('Added category_id column')

# Populate category_id from existing category text matching merchandise_categories
cur.execute('''
UPDATE merchandise m
LEFT JOIN merchandise_categories c
  ON LOWER(TRIM(m.category)) = LOWER(TRIM(c.name))
SET m.category_id = c.id
WHERE m.category_id IS NULL
''')
print('Populated category_id rows:', cur.rowcount)

# Show active product count
cur.execute("SELECT COUNT(*) FROM merchandise WHERE status = 'active'")
print('Active products:', cur.fetchone()[0])

c.commit()
cur.close()
c.close()
