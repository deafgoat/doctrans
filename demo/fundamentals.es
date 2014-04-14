faq : MongoDB fundamentos 
este documento direcciones básico de alto nivel de preguntas sobre su uso de MongoDB . 
si usted no &apos;t encontrar la respuesta que &apos;re buscando , compruebe la : doc : &apos; lista completa de FAQs &lt; / faq &gt; &apos; o envíe sus preguntas a la lista de usuarios de correo de &apos; MongoDB &lt; https : / / groups.google.com / forum / ? fromgroups # ! forum / mongodb-user &gt; &apos; _ . 
¿ Qué tipo de base de datos de MongoDB ? 
MongoDB es un : term : &apos; document &apos; \ orientado DBMS . Think de MySQL pero con : term : &apos; JSON &apos; tipo de objetos comprising el modelo de datos , en lugar de RDBMS tablas . Significantly , MongoDB admite ni une ni asientos . sin embargo , características secundaria los índices , un expressive consulta idioma , atÃ ³ mica per-document escribe en un nivel , y fully-consistent lee . 
Operationally , MongoDB características master-slave replicación con automatizado de conmutación por error y los valores escalabilidad horizontal a través de automatizado de particionamiento range-based . 
MongoDB utiliza : term : &apos; BSON &apos; formato binario , un objeto de forma similar , pero más expressive que : term : &apos; JSON &apos; . 
¿ MongoDB las bases de datos tienen tablas ? 
Instead de tablas , una base de datos de MongoDB almacena sus datos en : term : &apos; colecciones &lt; collection &gt; &apos; , que son áspero equivalente de RDBMS tablas . una colección contiene una o más : term : &apos; los documentos &lt; documentos &gt; &apos; , que se corresponde con una grabación o una fila en una tabla de una base de datos , y cada documento tiene una o más campos , que se corresponde con una columna en una tabla de una base de datos . 
colección de imagenes tienen importante diferencias de RDBMS tablas . los documentos en una sola colección puede tener un único y establecer una combinación de los campos . los documentos no necesita tener idénticos los campos . puede añadir un campo para algunos documentos en una colección sin añadir este campo para todos los documentos en la colección . 
ver 
¿ MongoDB tiene esquemas de bases de datos ? 
MongoDB utiliza esquemas dinámicas . puede crear colecciones sin definir la estructura , es decir los campos o los tipos de sus valores de los documentos en la colección . puede cambiar la estructura de documentos simplemente añadiendo nuevos campos o borrar los existentes . los documentos en una colección no necesita tener un idénticos conjunto de los campos . 
en la práctica , es común para los documentos en una colección para tener una razón mezcla homogÃ © nea estructura ; sin embargo , no es un requisito . MongoDB habilidad esquemas de la migración de esquema flexible y augmentation son muy fácil en la práctica , y en raras ocasiones , si alguna vez , deberá escribir guiones que realizar &quot; cambiar el tipo de tabla &quot; operaciones , que simplifica y facilita fractales desarrollo de software con MongoDB . 
¿ Qué idiomas ¿ Puedo usar para trabajar con MongoDB ? 
cliente : term : &apos; MongoDB &lt; controlador drivers &gt; &apos; existe para todos los más populares lenguajes de programación , y muchos otros . vea la : ecosistema : &apos; última lista de los controladores &lt; / drivers &gt; &apos; para obtener más detalles . 
: doc : &apos; / applications / drivers &gt; &apos; . 
no soporte de MongoDB SQL ? 
no . 
sin embargo , MongoDB soporta un amplio , ad-hoc de la consulta de su propio idioma . 
: doc : &apos; / reference / operator &apos; 
¿ Qué típica usa para MongoDB ? 
MongoDB tiene un genérico diseño , que es apropiado para un gran número de los casos de uso . ejemplos incluyen el contenido de las aplicaciones de gestión de los sistemas portátiles , gaming , e-commerce , analytics , archivar , y el registro . 
no usar MongoDB para sistemas que requieren SQL , une , y multi-object asientos . 
no soporte de MongoDB ACID asientos ? 
MongoDB no admite multi-document asientos . 
sin embargo , MongoDB no proporcionan operaciones atÃ ³ mica en un documento . a menudo estos document-level nombres de las operaciones se suficiente para resolver problemas que requiera ACID asientos en una base de datos . 
por ejemplo , en MongoDB , puede incluir información en la jerarquía anidada arrays o documentos dentro de un documento y actualizar todo el documento en una sola atÃ ³ mica . una operación de bases de datos puede representar el mismo tipo de datos con varias tablas y filas , que requiera asiento soporte para actualizar los datos atomically . 
MongoDB permite a los clientes leer los documentos insertado o modificados antes de que las entregas estas modificaciones en disco , sin preocuparse de escribir nivel o journaling configuración . como resultado , las aplicaciones pueden observar dos clases de comportamientos : 
para sistemas con múltiples lectores concurrent y las grabadoras , MongoDB le permiten a los clientes leer el resultado de una operación de escritura antes de la operación de escritura devuelve . 
si el : program : &apos; mongod &apos; finaliza antes de la entrada del diario las modificaciones , incluso si un escribir devuelve con éxito , consultas pueden leer los datos que no existe después de : program : &apos; mongod &apos; reinicia . 
otros sistemas de la base de datos se refieren a estos isolation semánticas como * leer uncommitted * . para las inserta y actualizaciones , MongoDB modifica cada documento en isolation : los clientes nunca ver los documentos de estados intermedia . para multi-document operaciones , MongoDB no proporciona ningún multi-document asientos o isolation . 
cuando : program : &apos; mongod &apos; devuelve con * journaled concernencia de escritura * , los datos se realicen en el disco y estará disponible después de : program : &apos; mongod &apos; reinicia . 
para los conjuntos de réplicas , escribir las operaciones se durable sólo tras un escribir replica y las modificaciones a la entrada del diario de un mayor parte de los miembros de la misma . MongoDB con los datos a la entrada del diario con independencia de journaled concernencia de escritura : usar la configuración : &apos; ~ storage.journal.commitIntervalMs &apos; que controlan la frecuencia con un : program : &apos; mongod &apos; las entregas la entrada del diario . 
MongoDB no requieren una cantidad de RAM ? 
no . habilidad varios posible ejecutar MongoDB en una máquina con un pequeño cantidad de RAM libre . 
MongoDB automáticamente utiliza memoria libre en la máquina como su caché . el recurso monitores mostrar que MongoDB utiliza un montón de memoria , pero su uso es dinámica . si otro proceso suddenly necesita la mitad de servidor habilidad RAM , MongoDB se rendimiento de la caché de memoria a otro proceso . 
técnicamente el sistema operativo habilidad de memoria virtual subsistema gestiona la habilidad de MongoDB . esto significa que MongoDB usará como mucho espacio libre , ya que puede intercambiar a disco como sea necesario . despliegues con hay memoria suficiente para ajustar la habilidad de la aplicación de un conjunto de datos en memoria para conseguir la mejor rendimiento . 
: doc : &apos; / faq / diagnósticos &apos; para respuestas a preguntas y memoria adicional de MongoDB . 
¿ Cómo puedo configurar el tamaño de caché ? 
MongoDB no tiene configurable caché . MongoDB utiliza * * memoria libre en el sistema automáticamente por forma de memory-mapped archivos . los sistemas operativos utilizar la misma aproximación con su sistema de archivos de los navegadores . 
no requieren una capa de caché de MongoDB para application-level caché ? 
no . en MongoDB , un documento habilidad representaciÃ ³ n en la base de datos es similar a su representación en la memoria . esto significa que la base de datos usables ya contiene el formulario de datos , haciendo que los datos pueden usar en el almacén de persistente y en la caché de aplicaciones . esto elimina la necesita para una capa de caché separado en la aplicación . 
esta es distinto de una base de datos , donde Cacheando datos es más de una cara . las bases de datos deberá transformar datos en el objeto significados que las aplicaciones pueden leer y debe almacenar la conversión de datos en un caché separado : si estas transformación de datos a los objetos de la aplicación que requieren une , este proceso se incrementa el superior relacionadas con el uso de la base de datos que aumenta la importancia de la capa de caché . 
hace MongoDB manejar caché ? 
sí . MongoDB contiene todos los datos usados más recientemente en RAM . si ha creado índices para las consultas y su trabajo conjunto de datos se ajusta RAM , MongoDB tiene todas las peticiones de la memoria . 
MongoDB no implementa una consulta de caché : MongoDB tiene todas las peticiones directamente desde los índices y / o archivos de datos . 
se escribe en el disco de forma inmediata , o lazily ? 
escribe se físicamente al : doc : &apos; diario &lt; / core / journaling &gt; &apos; dentro de 100 milisegundos , de forma predeterminada . el punto de escritura , el que se &quot; durable &quot; en el sentido que después de un pull-plug-from-wall evento , los datos se recoverable después de un difícil reiniciar . consulta : : &apos; ~ storage.journal.commitIntervalMs &apos; para obtener más información sobre la entrada del diario enviar ventana . 
al la entrada del diario enviar es casi instantánea , MongoDB escribe para los archivos de datos lazily . MongoDB puede esperar al escribir datos en los archivos de datos por tanto como un minuto de forma predeterminada . esto no afecta a que sean duraderos , como la entrada del diario tiene información suficiente para asegurarse de recuperación de fallo . para cambiar el intervalo para escritura para los archivos de datos , consulta : : &apos; ~ storage.syncPeriodSecs &apos; . 
qué idioma se escribirá en MongoDB ? 
MongoDB está implementado en C + + . : term : &apos; drivers &lt; drivers &gt; &apos; y bibliotecas cliente de normalmente se escribirá en sus respectivos idiomas , aunque algunos de los drivers usan C extensiones para mejorar el rendimiento . 
¿ Qué son las limitaciones de 32 bits versiones de MongoDB ? 
MongoDB utiliza : ref : &apos; memory-mapped archivos &lt; faq-storage-memory-mapped-files &gt; &apos; . cuando se está ejecutando una compilación de 32 bits de MongoDB , el tamaño de almacenamiento para el servidor , incluyendo los datos y los índices , es 2 gigabytes . por esta razón , no deploy MongoDB para producción en máquinas de 32 bits . 
si está ejecutando una compilación &apos;re 64 bits de MongoDB , habilidad virtualmente sin límite de tamaño de almacenamiento . para los despliegues en producción , 64-bit crea y sistemas operativos , se recomienda . 
&quot; &apos; Blog envío : 32 limitaciones &lt; http : / / blog.mongodb.org / envío / 137788967 / 32-bit-limitations &gt; &apos; _ &quot; 
32-bit construye desactivar : term : &apos; journaling &lt; diario &gt; &apos; , de forma predeterminada , porque journaling más limita el número máximo de datos que la base de datos puede 
