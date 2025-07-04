PGDMP                      }            pizzashop_2cr4    16.8 (Debian 16.8-1.pgdg120+1)    17.2     2           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            3           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            4           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            5           1262    16389    pizzashop_2cr4    DATABASE     y   CREATE DATABASE pizzashop_2cr4 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF8';
    DROP DATABASE pizzashop_2cr4;
                     pizzashop_2cr4_user    false            6           0    0    pizzashop_2cr4    DATABASE PROPERTIES     7   ALTER DATABASE pizzashop_2cr4 SET "TimeZone" TO 'utc';
                          pizzashop_2cr4_user    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                     pizzashop_2cr4_user    false            �            1259    16399    foods    TABLE     �   CREATE TABLE public.foods (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price integer NOT NULL,
    image text,
    description text,
    "isPopular" boolean DEFAULT false,
    category character varying(50)
);
    DROP TABLE public.foods;
       public         heap r       pizzashop_2cr4_user    false    5            �            1259    16398    foods__id_seq    SEQUENCE     �   CREATE SEQUENCE public.foods__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.foods__id_seq;
       public               pizzashop_2cr4_user    false    5    216            7           0    0    foods__id_seq    SEQUENCE OWNED BY     >   ALTER SEQUENCE public.foods__id_seq OWNED BY public.foods.id;
          public               pizzashop_2cr4_user    false    215            �            1259    16436    order_items    TABLE       CREATE TABLE public.order_items (
    order_id integer NOT NULL,
    food_id integer NOT NULL,
    food_name character varying(255) NOT NULL,
    quantity integer NOT NULL,
    image text,
    price_of_one integer NOT NULL,
    total_price integer NOT NULL,
    options jsonb
);
    DROP TABLE public.order_items;
       public         heap r       pizzashop_2cr4_user    false    5            �            1259    16415    orders    TABLE     �  CREATE TABLE public.orders (
    order_id integer NOT NULL,
    customer_name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    phone_number character varying(20) NOT NULL,
    email character varying(255),
    order_price integer NOT NULL,
    shipping_fee integer NOT NULL,
    discount integer NOT NULL,
    coupon_code character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.orders;
       public         heap r       pizzashop_2cr4_user    false    5            �            1259    16414    orders_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.orders_order_id_seq;
       public               pizzashop_2cr4_user    false    5    218            8           0    0    orders_order_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;
          public               pizzashop_2cr4_user    false    217            �           2604    16402    foods id    DEFAULT     e   ALTER TABLE ONLY public.foods ALTER COLUMN id SET DEFAULT nextval('public.foods__id_seq'::regclass);
 7   ALTER TABLE public.foods ALTER COLUMN id DROP DEFAULT;
       public               pizzashop_2cr4_user    false    215    216    216            �           2604    16418    orders order_id    DEFAULT     r   ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);
 >   ALTER TABLE public.orders ALTER COLUMN order_id DROP DEFAULT;
       public               pizzashop_2cr4_user    false    218    217    218            ,          0    16399    foods 
   TABLE DATA           [   COPY public.foods (id, name, price, image, description, "isPopular", category) FROM stdin;
    public               pizzashop_2cr4_user    false    216   �"       /          0    16436    order_items 
   TABLE DATA           x   COPY public.order_items (order_id, food_id, food_name, quantity, image, price_of_one, total_price, options) FROM stdin;
    public               pizzashop_2cr4_user    false    219   h(       .          0    16415    orders 
   TABLE DATA           �   COPY public.orders (order_id, customer_name, address, phone_number, email, order_price, shipping_fee, discount, coupon_code, created_at) FROM stdin;
    public               pizzashop_2cr4_user    false    218   )       9           0    0    foods__id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.foods__id_seq', 24, true);
          public               pizzashop_2cr4_user    false    215            :           0    0    orders_order_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.orders_order_id_seq', 2, true);
          public               pizzashop_2cr4_user    false    217            �           2606    16407    foods foods_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.foods DROP CONSTRAINT foods_pkey;
       public                 pizzashop_2cr4_user    false    216            �           2606    16442    order_items order_items_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (order_id, food_id);
 F   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_pkey;
       public                 pizzashop_2cr4_user    false    219    219            �           2606    16423    orders orders_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public                 pizzashop_2cr4_user    false    218            �           2606    16448 $   order_items order_items_food_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_food_id_fkey FOREIGN KEY (food_id) REFERENCES public.foods(id);
 N   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_food_id_fkey;
       public               pizzashop_2cr4_user    false    216    219    3221            �           2606    16443 %   order_items order_items_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_order_id_fkey;
       public               pizzashop_2cr4_user    false    219    3223    218                        826    16391     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     Z   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO pizzashop_2cr4_user;
                        postgres    false                       826    16393    DEFAULT PRIVILEGES FOR TYPES    DEFAULT ACL     V   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO pizzashop_2cr4_user;
                        postgres    false                       826    16392     DEFAULT PRIVILEGES FOR FUNCTIONS    DEFAULT ACL     Z   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO pizzashop_2cr4_user;
                        postgres    false            �           826    16390    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     �   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO pizzashop_2cr4_user;
                        postgres    false            ,   �  x��V�oG?����ݛd�� �ƕ��C�*���x���5�l�pC8T�"U���E����{�a������7c�٨=�2����~������j�ح�E�RElk��+++������r��n���xi�"����E`������ȟ�&�q1=N���b�.a��ln6�.�ˑ4�����8i��el�A��瓄u���\��,x#$xW��n�?��1�uF�DW�<XQ�S�k��S��S�O��������d����7	S��|a��N�y��"V&��5�W��[Œ�Z�~�cm]�����q�ȟI��v�/k�fS����6��P����O���ȟh6�9��j������8�����E�C��SHE����_����zu��?� ���9��>������H"�A��m�x,����k����KK|	��^��\�%�-����I��]��Gݦ:�O�?��E4��cea�!��="�,��@(������蓻�5'���N�B��IT+���R:�SP)�ؼ�����Ѻw=���C��9������pݯ) b�ޭ�� m/�i~g[����*y/rO�3��I�E�7!����_Yl"ΘI�m�\`�D�?���(o]7��Eg�R��4��M.��:0��F} (	��`2`[��`��!FH��h��mV���z����Ysp@f����$�D�ʦ��|��S�ݪ����rPV��ӡHG�۬�bάȓ��1��v,Ao��v�l�e��T�6A�����rw�z�PΆv�
��gz�J�.��m��:e;P�^h3k�w������K�s�C�cEe��Q?	Bѥ&j��>���1�j�)&��JDm�5�U�������t����>ǅ���0��>�-ά�6r'N�1W���� ����⯹�_Ҙ{aX����}��:�UL�&�7S�{����yN9�7��'ʡ��P"X�1`����c�\��h����q���T.,��qb%���퓳>:#��l�� �l�3W R�|%u�>��6Ӣ�[���f-mf�ߤֺX���~�5Mұ�}��^c7,f�ҳ�h\oѸ�K�5 5D\��R)(�W�%��l����GJd�����7.K���-�A��{�q�/S�6/�t(9��������1�m�FA�1����=�Vva(�7\q m����R�"# 4��Vr�>��|��w��.+WHO$c��a�
9�K�t�(Zif�}���z�tÊU�n��b�GI���R)(b#]�o8k�	�����pk��|l�0�m� 7�kr�ͳJ��X���J�>{���Z.�KZ�D�V�&5����8	\c����.����$���j��&C��JD�&��b.v�6�G5�|�OƳ`A��	�;��n����ۘm2p��77������OiZ����R�������      /   �   x�3��t:�0/C������T�c��ię���Y���t�2uM�
�¦���� *Əˈ�Ј�����
���W�)�gޔ�i���������߄3 ��*Q!��\������� Q}0�[�����dd6J����� �G@�      .   �   x�U�=N�@F��S�b��d��t)�%$�4+cmVJf%���#�@

s�$~�IO���,|<��x�t��4��h���
5����z:=����f_�*�⥭`Ӏ���@�A5f&v�Z_3�K.�w%y���M��[����ݷ4�(��C�u=ކ�2ޥ����C�8�%3h���L�˸iW�y�ϛs�FU������[�fSc>[PP�     