(function () {
    'use strict';
    angular.module('app.config', [])
        .constant('CONFIG_SETTINGS', {
            'BRANCHES': [
                {"text": "GROUP", "thematicId": "5741cfae-c8c2-47f4-981c-96284a70975c"}, 
                {"text": "TGS", "thematicId": "ecf28f2e-d4fa-4222-801c-69674fdc59ac"},
                {"text": "EP", "thematicId": "100e2656-a99e-4c1b-a209-b21cc4eca5bf"},
                {"text": "GRP", "thematicId": "8cc4ceda-b5a6-4124-aaf2-1634ea4385d2"},
                {"text": "HLD", "thematicId": "dbcb7b5c-b0f0-4cfc-b7e9-ed100f55332d"},
                {"text": "MS", "thematicId": "23d8a67c-944a-4b13-a553-f004933ff8bb"},
                {"text": "RC", "thematicId": "fe5ae9be-9c22-4fd9-a273-780f486e542b"},
                {"text": "TS", "thematicId": "1331e81a-ffe5-4c33-9776-bfb4d2924bbc"}
            ],
            'PROFESSIONAL_FIELDS': [
                {"text": "Achats", "thematicId": "0bcc5f67-9342-49d3-9d4e-2a69e48874f7"},
                {"text": "Assistance/Secrétariat", "thematicId": "f439e2d1-c9b1-4ed1-b898-2caa728aa8c4"},
                {"text": "Associations/Joint Ventures (EP)", "thematicId": "D850D758-EEE2-11E2-BD5F-A7F16088709B"},
                {"text": "Audit Interne", "thematicId": "4be6e0b1-971f-4fef-9335-33fc4b6712fc"},
                {"text": "Business Stratégie Economie", "thematicId": "e7faaf25-3c1c-486a-b422-a604d853fc3e"},
                {"text": "Commerce", "thematicId": "ccb688f6-ba6e-4e63-9443-afe64815fee2"},
                {"text": "Communication", "thematicId": "432bdd48-8ed2-4919-ad21-8561a2001707"},
                {"text": "Etudes de Développement (EP)", "thematicId": "C8D25E46-EEE2-11E2-BB6F-A3F16088709B"},
                {"text": "Exploitation (EP)", "thematicId": "1d2828e6-23de-42dd-a951-6d7d374d1ea3"},
                {"text": "Fabrication/Transformation", "thematicId": "a93314b0-e66b-475e-8e78-a2733b3b6879"},
                {"text": "Finance", "thematicId": "f8bedf8d-8d60-4d1d-afd6-5d5581e1a28c"},
                {"text": "Forage Puits (EP)", "thematicId": "aea83118-445e-4e65-810d-924da2a0dcf3"},
                {"text": "Géosciences (EP)", "thematicId": "397e681e-b9f9-468b-b2e9-77bbce3d4c5c"},
                {"text": "Gouvernance et Contrôle Interne", "thematicId": "5e3519fc-bfce-4a6b-a223-5429ab9c4459"},
                {"text": "HSEQ", "thematicId": "7285f05b-4f51-4e04-9a14-6c5d014a9ee8"},
                {"text": "Information Documentation", "thematicId": "634c9f93-636a-4719-aaec-0e0a273f1ad0"},
                {"text": "Inspection/Maintenance", "thematicId": "1331331b-c314-47c8-991f-0990afedb57a"},
                {"text": "Juridique", "thematicId": "585851db-6890-45eb-abb1-610a35bcd4df"},
                {"text": "Logistique Support Opérations (EP)", "thematicId": "90058ccf-5dde-44e0-9018-a65ec9c3251f"},
                {"text": "Médecine du Travail", "thematicId": "58f1e480-8456-4f9d-ae8b-a666749566a6"},
                {"text": "Moyens Généraux", "thematicId": "1c6d4dae-3e26-4ef7-93c3-6253e1307661"},
                {"text": "Project et Construction (EP)", "thematicId": "6C4ECF96-EEE3-11E2-B908-25F26088709B"},
                {"text": "Recherche, Innovation & Développement", "thematicId": "7035e4bd-6d92-4f92-8dce-a7b5edeec08a"},
                {"text": "Ressources Humaines", "thematicId": "6c45f4ca-1218-42f4-a87a-29edb1ae1da7"},
                {"text": "Systèmes d'Information Télécom", "thematicId": "72e2072b-0b64-452a-ac2d-d01921365b20"},
                {"text": "Technologies (EP)", "thematicId": "C8C9D55E-EEE3-11E2-B93E-7BF26088709B"}
            ],
            'HR': [
                {"text": "RH & Moi", "thematicId": "e94b456e-4b1e-440f-9338-c8a8ed7a28a6"}
            ],
            'GEOGRAPHICAL_SITES': [
                
                {"country": "Afrique du Sud", sites: [
                    {"text": "Capetown – Bellville Head Office", "thematicId": "298a442f-fb17-4359-b8ec-be7e06690075"},
                    {"text": "Johannesburg Rosebank", "thematicId": "2a75c72f-8eb0-4c75-8d53-d9cf8b512302"}
                ]},
                {"country": "Algérie", sites: [
                    {"text": "Algiers Val D’hydra", "thematicId": "8ea26b64-6ad4-416a-bfc3-a90508b4dcbe"}
                ]},
                {"country": "Allemagne", sites: [
                    {"text": "Berlin Tour Total", "thematicId": "582b0ac1-1fa8-4907-8940-c59533ba7b38"},
                    {"text": "Frankfurt", "thematicId": "32026946-0a9f-48fd-a455-96c86bd0cbed"},
                    {"text":"Leuna Plattform","thematicId":"5b38bdb9-5850-4a36-9631-9ca872540924"},
					{"text":"Brunsbüttel","thematicId":"a81f8f39-c8b3-4b2f-8751-f0756614a9c6"}
                ]},
                {"country": "Angola", sites: [
                    {"text": "Luanda", "thematicId": "451ece17-97bb-4106-937b-334c0746e3ab"}
                ]},
                {"country": "Arabie Saoudite", sites: [
                    {"text": "Jeddah", "thematicId": "72b6c8f4-8905-4e44-8f76-5f7eb46f2687"}
                ]},
                {"country": "Argentine", sites: [
                    {"text": "Buenos Aires", "thematicId": "7ba69784-d83c-426d-9d4d-42a61bae3117"},
                    {"text": "Neuquén", "thematicId": "ca8e9e28-8081-4acd-ae40-add95e769bfa"},
                    {"text":"Tierra del Fuego","thematicId":"ca2b6cdd-e2c7-4a07-ab82-c34d2dfc2643"}
                ]},
                {"country": "Australie", sites: [
                    {"text": "Perth-Brisbane", "thematicId": "96dc1a02-aa7a-4835-8033-266f93a0bcab"}
                ]},
                {"country": "Azerbaïdjan", sites: [
                    {"text": "Bakou", "thematicId": "c0a8785e-7e18-46a7-9050-07b706350427"}
                ]},
                {"country": "Belgique", sites: [
                    {"text": "Bruxelles Industrie", "thematicId": "d6128231-5284-46d9-9afc-f81a8b080858"},
                    {"text":"Antwerp Platform","thematicId":"16a22ff2-de7a-4966-a850-b54d6bf787f8"},
                    {"text":"Bruxelles Commerce","thematicId":"744b02ef-22df-4195-af91-32b2e75dfc25"},
                    {"text":"Feluy Centre de Recherche et Technologie","thematicId":"a326e00a-2da7-44c4-8ad2-060ea4d7f2fe"},
                    {"text":"Feluy Usine Polymères","thematicId":"1d0344cd-cb91-4a6a-ae65-540bec2f4766"},
                    {"text":"Ertvelde","thematicId":"520c9f12-0c82-4f2d-8af9-fbc0e9faaee0"},
                    {"text":"Schoten","thematicId":"03276816-d142-4500-bc22-41466426c084"}
                    

                ]},
                {"country": "Bolivie", sites: [
                    {"text": "Santa Cruz", "thematicId": "6eee7c34-9252-4533-a886-f6dcb3d2f2fc"}
                    
                ]},
                {"country": "Brésil", sites: [
                    {"text": "Rio de Janeiro", "thematicId": "f0f70fce-f47b-424b-b381-93beac64d05a"}
                    
                ]},
                {"country": "Burkina Faso", sites: [
                    {"text": "Ouagadougou", "thematicId": "3bc6a2cf-9f1e-4a2d-8513-a88ddfec7ec3"}
                ]},
                {"country": "Cameroun", sites: [
                    {"text": "Douala", "thematicId": "b6c2819b-ed48-415b-845c-02e66d07f274"}
                ]},
                {"country": "Canada", sites: [
                    {"text": "Calgary", "thematicId": "a07bb631-d3e7-47ed-bfad-0c7db77dfa4a"}
                ]},
                {"country": "Chine", sites: [
                    {"text": "Beijing", "thematicId": "b4508374-77c2-4a02-b99b-4604d238dc6c"},
					{"text": "Guangzhou", "thematicId": "b8ec9962-5aab-45a2-bf7d-96ca1312a97a"},
					{"text": "Shanghai", "thematicId": " 246e3df0-9f7b-439a-88b1-65394542c567"}
                ]},
                {"country": "Congo", sites: [
                    {"text": "Brazzaville rue de la Corniche", "thematicId": "edc18370-d08d-47a2-8943-f1ef6e33ff47"},
                    {"text":"Pointe-Noire","thematicId":"6783c9b8-2f7a-417e-b7b2-0dfc49ec3832"}
                ]},
                {"country": "Côte d’Ivoire", sites: [
                    {"text": "Abidjan Rive Gauche", "thematicId": "4245a49e-5084-4a1c-868b-8fe43320f7a2"}
                    
                ]},
                {"country": "Egypte", sites: [
                    {"text": "Cairo Maadi-Degla", "thematicId": "895e6672-6453-4206-93c1-bd56c920baea"}
                    
                ]},
                {"country": "Emirats Arabes Unis", sites: [
                    {"text": "Abu Dhabi", "thematicId": "a2f9c565-d1d4-41e1-bfa0-888c8e8f4c45"},
                    {"text": "Dubai Middle East", "thematicId": "d0e2c9e3-9cb7-4eb0-9c9b-ae8cc184be0f"}
                ]},
                {"country": "Espagne", sites: [
                    {"text": "El Prat Polymers Plant", "thematicId": "b2571a00-41b2-4c43-a610-68c7eec94757"},
                    {"text":"Madrid Ribera del Loira","thematicId":"aed39706-48d8-4ac3-a12c-2d39f851f198"}
					
					
                    
                ]},
                {"country": "United States", sites: [
                    {"text": "Beaumont Plant", "thematicId": "c058bb8a-60eb-49d9-ac75-d9419c250c1f"},
                    {"text": "Carville Plant", "thematicId": "99ed7f17-3d28-44e0-9e36-959395e7d1ef"},
                    {"text":"Chatom Plant","thematicId":"874bbcc5-b1dd-46bc-9e5f-25c14e82adf5"},
                    {"text":"Exton Office & Tech Center","thematicId":"92e6412c-719a-41fd-8b3e-c02aa792a41d"},
                    {"text":"Exton Retia Office", "thematicId":"81c6c407-4473-402d-b23d-2f8ff99af71d"},
                    {"text":"Grand Junction Plant","thematicId":"6c8e79d6-ea67-4e2e-8793-9df09945e733"},
                    {"text":"Houston Bayport Plant","thematicId":"0d67cd70-10dc-4685-b6f8-7e8b6544a754"},
                    {"text":"Houston Channelview Plant","thematicId":"2a0b8e5b-2694-427d-926e-3dce401e8775"},
                    {"text":"Houston La Porte Plant","thematicId":"a4e980eb-7eb0-4afb-a13c-df07289da487"},
                    {"text":"Houston La Porte Res & Tech Center","thematicId":"e64352db-fbd2-4181-9c6f-c55bb7fc77b2"},
                    {"text":"Houston Total Plaza","thematicId":"50a80f1f-7578-462e-a271-8e3e9ad16fde"},
                    {"text":"Houston San Felipe Office","thematicId":"43b410f3-9321-45ac-8940-53e51a853d53"},
                    {"text":"Houston MS and Linden","thematicId":"5d68fe91-a7f8-4849-9bd0-d5c049781b0e"},
                    {"text":"Port Arthur Refinery","thematicId":"03364d90-fa84-454f-8b41-9ff1e897f8d5"},
                    {"text":"Stratford Plant","thematicId":"bc22c217-06ac-4956-ad74-05afe5c4d958"}
					
                ]},
                {"country": "Ethiopie", sites: [
                    {"text": "Adis Abeba", "thematicId": "d7e61885-cfad-49cd-9a90-5a2e60d82cc5"}
                ]},
                
                {"country": "France", sites: [
                    {"text": "La Mède Plateforme de la Mède", "thematicId": "8095E592-0738-48AB-B69E-0ED39930E2F3"},
                    {"text": "Gif-sur-Yvette Campus", "thematicId": "c25be367-c46d-4aba-9959-bf1179693e7d"},
                    {"text": "Givors ACS", "thematicId": "3bf624d0-d584-49b7-bb1d-1a32db1923e7"},
                    {"text": "Gonfreville Plateforme Normandie", "thematicId": "F2FE9612-73B8-47AA-9BC1-F35F09C4AF75"},
                    {"text": "Lyon DR Sud-Est", "thematicId": "c38bf3f7-49fb-4d02-8bdb-e063a9992d17"},
                    {"text": "Paris la Défense", "thematicId": "5432F0DE-EEE5-11E2-96A0-C5F36088709B"},
                    {"text": "Pau CSTJF", "thematicId": "868e272a-5e2b-4901-b91e-3b557a999a9c"},
                    {"text": "Saint-Herblain DR Ouest", "thematicId": "863a6d56-fbe4-4fd0-a88a-8835243e8de9"},
                    {"text": "Saint-Martin d'Hères", "thematicId": "bc900590-7300-43b4-a893-fcec43db8024"},
                    {"text": "Solaize CRES", "thematicId": "98f1f201-7ba9-4315-803b-4025b6bb478a"},
                    {"text":"Donges Plateforme de Donges","thematicId":"11e85ec6-ac92-43dd-a289-3b2021f3c1d1"},
                    {"text":"Feyzin Plateforme de Feyzin","thematicId":"ccace33a-a6ea-4957-a841-c3cc3e5410f5"},
                    {"text":"Gonfreville TRTG","thematicId":"2723e4a8-1429-4b0d-bfb1-be9c6345ffc4"},
                    {"text":"Mardyck Etablissement Flandres","thematicId":"26b8a548-7918-451d-9860-1c5eb8e07693"},
                    {"text":"Mormant Plateforme de Grandpuits Gargenville","thematicId":"51d1c170-964d-428b-aa00-c72808e79c87"},
                    {"text":"Saint Avold Platefome Carling","thematicId":"d3212646-efda-4f59-9c4c-5e14dae5466d"},
					{"text":"La Garenne Nova Carquefou StPriest","thematicId":"022397b1-2a67-489c-8297-b06f7a1f8270"},
					{"text":"Solaize CRES","thematicId":"4dfa91d0-83d7-4bad-89b6-04db52244b7a"}
                ]},
                {"country": "Gabon", sites: [
                    {"text": "Libreville MS", "thematicId": "d43d61ee-806b-4a6b-89ac-1274ad381f2c"},
                    {"text": "Port-Gentil Libreville EP", "thematicId": "005308ff-2640-4ed6-9a7e-f9401bf6af77"}
                ]},
                {"country": "Ghana", sites: [
                    {"text": "Accra Liberia road", "thematicId": "accf5c99-f078-4c63-b95d-e91296b99537"}
                ]},
                {"country": "Guinée Equatoriale", sites: [
                    {"text": "Malabo", "thematicId": "287d3d2d-03ac-4b34-bd6a-8ec02871ce9a"}
				 ]},
                 {"country": "Guinée", sites: [
                   {"text": "Conakry", "thematicId": "d7397cf4-d343-4f48-af76-7ec53b14428c"}
                ]},
			/*	{"country": "Guadeloupe", sites: [
                    {"text": "Pointe Noire", "thematicId": "6783c9b8-2f7a-417e-b7b2-0dfc49ec3832"}
                ]}, */
                {"country": "Inde", sites: [
                    {"text": "Mumbai", "thematicId": "04e4ab49-8e67-4199-a473-e3ea6cce6720"}
                ]},
				{"country": "Brunei", sites: [
                    {"text": "Bandar", "thematicId": "607e2c4e-3ea8-4479-a8fa-239624774fd1"}
                ]},
                {"country": "Italie", sites: [
                    {"text": "Basilicata", "thematicId": "6f85cabb-6d2b-4648-bae9-9f423c83ce2d"},
                    {"text": "Roma", "thematicId": "f7711a1f-3947-4b38-9824-db8232c62aac"}
                ]},
                {"country": "Jordanie", sites: [
                    {"text": "Amman", "thematicId": "7171639a-b315-4db1-8bfa-e1bf7020a93a"}
                ]},
                {"country": "Kazakhstan", sites: [
                    {"text": "Astana", "thematicId": "8746a784-c85b-45e7-a646-7a6ad74aafc3"}
                ]},
                {"country": "Kenya", sites: [
                    {"text": "Nairobi", "thematicId": "2ac94e09-c220-4129-97c3-f3fa5b1b7767"}
                ]},
				{"country": "Koweit", sites: [
                    {"text": "Kuwait City", "thematicId": "17ad012a-2244-4871-afa1-97c2f90cbc90"}
                ]},
                {"country": "Libye", sites: [
                    {"text": "Tripoli", "thematicId": "8d7529cb-cf52-4322-8a20-153b5e8a85d8"}
                ]},
                {"country": "Luxembourg", sites: [
                    {"text": "Luxembourg", "thematicId": "fc093c2b-9441-44b2-a3b5-6dc452199432"}
                ]},
                {"country": "Madagascar", sites: [
                    {"text": "Antananarivo Fitaratra", "thematicId": "a2436523-ea06-4668-86c7-169376d05567"}
                ]},
                {"country": "Malawi", sites: [
                    {"text": "Lilongwe", "thematicId": "0cc2206a-a1c6-4449-abd5-23dad34b9fe9"}
                ]},
                {"country": "Mayotte", sites: [
                    {"text": "Mamoudzou", "thematicId": "81b9a2c7-3688-480a-9a35-e7e2968d8504"}
                ]},
                

                {"country": "Maroc", sites: [
                    {"text": "Casablanca", "thematicId": "873101e3-e2e2-4ae5-8b0d-01f9dccf86b5"}
                ]},
                {"country": "Maurice", sites: [
                    {"text": "Port-Louis", "thematicId": "ee8b8c7b-ee37-4253-89d3-23461500fded"}
                ]},
                {"country": "Mauritanie", sites: [
                    {"text": "Nouakchott", "thematicId": "89dac324-a51a-4db3-b1e6-9dbfbf0d6e98"}
                ]},
                {"country": "Mozambique", sites: [
                    {"text": "Maputo", "thematicId": "5359c7b8-d798-4387-ab01-617464d6e8bb"}
                ]},
				{"country": "Myanmar", sites: [
                    {"text": "Yangon", "thematicId": "5894e72b-9d6a-43aa-9a8a-40f588c8e8f9"}
                ]},
                {"country": "Niger", sites: [
                    {"text": "Niamey", "thematicId": "4adaab1d-9e65-41d0-82f8-7c7c2abe39a3"}
                ]},
                {"country": "Nigeria", sites: [
                    {"text": "Lagos Churchgate st", "thematicId": "fc08c451-1de0-4f44-b435-de6666e9379e"},
					{"text": "Abuja", "thematicId": "b650a368-95e7-45e1-a011-93f3e5617887"},
					{"text": "Lagos Deep Water", "thematicId": "4ec8087c-fe36-4472-80d3-b1c72661313e"},
					{"text": "Port-Harcourt", "thematicId": "14a51d8e-147c-4f83-9633-44f836095812"}
                ]},
                {"country": "Norvège", sites: [
                    {"text": "Stavanger", "thematicId": "b24dfd45-7b9a-44bd-9c4a-e3e14b41ebe3"}
                ]},
                {"country": "Ouganda", sites: [
                    {"text": "Kampala (EP)", "thematicId": "0969d7de-5a90-4204-8337-d88207616fe1"},
                    {"text": "Kampala (MS)", "thematicId": "a3258f57-e3a9-434f-9c12-a91d1e983539"}
                ]},
                
                {"country": "Panama", sites: [
                    {"text": "Panama", "thematicId": "c8549b8d-19a6-4a22-aa04-57a95701ae99"}
                ]},
                {"country": "Pays-Bas", sites: [
                    {"text": "Den Haag Bezuidenhoutseweg", "thematicId": "824d6f89-d0c6-44fb-8603-3b6065198cb5"},
                    {"text": "Den Haag Bordewijklaan - Den Helder", "thematicId": "69ec69dc-8665-4883-b6fe-95796228bc02"},
                    {"text": "Vlissingen Zeeland Refinery", "thematicId": "ee3cf5fb-abe5-4ab6-8dca-5b83fe09550c"}
                ]},
                {"country": "Portugal", sites: [
                    {"text": "Lisbonne", "thematicId": "91a49759-e679-4685-a95e-65d912aa4df5"}
                ]},
				{"country": "Qatar", sites: [
                    {"text": "Doha", "thematicId": "0db17644-e5d9-4170-9895-18abb28f66d2"}
                ]},
                {"country": "Réunion", sites: [
                    {"text": "Le Port", "thematicId": "3eaaac26-d3e5-474f-bf5c-0dc9e0cc87dc"}
                ]},
                {"country": "Romania", sites: [
                    {"text": "Bucarest", "thematicId": "135c3b90-7581-4e11-af82-7fece1be3866"}
                ]},
                {"country": "United Kingdom", sites: [
                    {"text": "Aberdeen", "thematicId": "a5c5b4c3-d914-46ac-a6d2-13083a0d913d"},
                    {"text": "Colnbrook", "thematicId": "c97c853e-bea4-4fe9-bc9b-0823652175a1"},
                    {"text":"Grimsby Lindsey Platform","thematicId":"4c67e67d-0d34-4936-be23-efeb66f107d2"},
                    {"text":"London Euston","thematicId":"d9e5341b-3d37-47ad-a033-20d006a6724c"},
                    {"text":"Watford", "thematicId":"107c8847-7c5e-440a-a2f0-a13c0d101ea8"},
					{"text":"London Canary Wharf", "thematicId":"1ed7126a-cf17-4c93-918d-9069e06169a5"},
					{"text":"Redhill and Leeds", "thematicId":"70afa1f4-c6ad-4f13-a527-b2182cc0c7cb"},
					{"text":"Shetland Gas Plant", "thematicId":"163afc27-d8a7-4a4a-b895-6bd8ed0de9a6"}
                ]},
                {"country": "Russie", sites: [
                    {"text": "Moscow", "thematicId": "394dbe75-9889-4066-950d-b48ac4094692"}
                ]},
                {"country": "Senegal", sites: [
                    {"text": "Dakar", "thematicId": "b1ffedf6-ee26-4fb1-869b-8c9a3257d78e"}
                ]},
                {"country": "Singapour", sites: [
                    {"text": "Singapour Oden Towers", "thematicId": "d597281d-e970-4001-b409-340624378a84"}
                ]},
                {"country": "Suisse", sites: [
                    {"text": "Genève", "thematicId": "276727c0-ceab-45ca-b5a5-1d313d4256dd"}
                ]},
				{"country": "Tanzanie", sites: [
                    {"text": "Dar es Salaam", "thematicId": "fad497d2-0dc1-4cf2-8019-76234386aa99"}
                ]},
                {"country": "Thaïlande", sites: [
                    {"text": "Bangkok", "thematicId": "928d32d7-3ccf-44d0-a4df-7818806e5d6d"}
                ]},
                {"country": "Togo", sites: [
                    {"text": "Lomé", "thematicId": "c03c1fb6-e1d0-4438-9efc-2e58b4beb8fd"}
                ]},
                {"country": "Tunisie", sites: [
                    {"text": "Tunis", "thematicId": "24cf2942-d753-4810-b461-58dfd2c46375"}
                ]},
                 {"country": "Vénézuela", sites: [
                    {"text": "Caracas - Puerto la Cruz", "thematicId": "39b682d9-550f-474a-b03e-91c830cc0d86"}
                ]},
                {"country": "Zambie", sites: [
                    {"text": "Lusaka", "thematicId": "dff18d63-e3c1-4a1e-8a00-a2930edf24b8"}
                ]},
                {"country": "Zimbabwe", sites: [
                    {"text": "Harare", "thematicId": "02f7d06f-4eca-4dd1-9222-284cd40b2351"}
                ]}


            ],
            'ENTITIES': [
                {"branch": "EP", entities: [
                    {"text":"EP/EAC","thematicId":"135c062f-c764-43dc-a966-3458fc739b59"},
                    {"text": "EP/EXPLO", "thematicId": "7ff6bbde-9d4f-4e31-a45f-44e9b326a874"},
                    {"text":"EP/DDP","thematicId":"7976fe86-d755-4f58-8755-d52e6474a261"},
                    {"text":"EP/MENA","thematicId":"7e1bf105-a747-4a4d-ae4e-feea2a4c7650"},
                    {"text":"EP/DSO","thematicId":"b28ff91b-9838-4149-b9ae-f7533eb9f3c3"},
                    {"text": "EP/SCR", "thematicId": "de81e170-dd69-499f-bab7-15fdff6692cd"},
                    {"text": "EP/SG", "thematicId": "bee0d05b-016d-4a0f-bdcb-6dfd20086a6c"},
                    {"text": "EP/AF", "thematicId": "d5c9c4b8-9b0c-4606-a866-5b7dc0f7c10c"},
                    {"text": "EP/APC", "thematicId": "f2bb83a3-d4b7-4551-9705-62ee94116dea"},
                    {"text": "EP/HSEQ", "thematicId": "e4729dab-4b18-4152-a6de-fa894d4a5503"},
                    {"text":"EP/APC/THTEPTH","thematicId":"1de5cb73-cadc-4bc6-b623-c3c0c00f3025"},
                    {"text":"EP/APC/AUTEPAU","thematicId":"03b0b05c-ccb2-48de-bda8-d5918bc1833e"},
                    {"text":"EP/AME/USTEPUS","thematicId":"8e93af47-3953-4847-9645-deeff6cc6821"},
                    {"text":"EP/APC/MYTEPMY","thematicId":"a70de862-2952-4862-a789-7aa1305d376e"},
                    {"text":"EP/EAC/NOTEPNO","thematicId":"82b9c5d2-d0f0-48a8-ac50-6a6eba31b02a"},
                    {"text":"EP/AME/CATEPCA","thematicId":"2346eb27-e8c2-419f-9ae8-899baa5d5176"},
                    {"text":"EP/AME/BOTEPBO","thematicId":"cc362f79-8773-4afd-b179-f3782969820f"},
                    {"text":"EP/AME/VETEPVE","thematicId":"04c43f6f-b7bb-45c8-ae4c-643a351da2d4"},
                    {"text":"EP/EAC/UKTEPUK","thematicId":"7c5aa83e-e39d-4291-8937-7182f4defb6e"},
                    {"text":"EP/AF/UGTEPUG","thematicId":"496f3700-8de9-4db0-a3b3-91b5f1d402ab"},
                    {"text":"EP/MENA/LYTEPLY","thematicId":"2ede1881-f988-4bf8-9f93-8674812c9fd1"},
                    {"text":"EP/MENA/AETEPABK","thematicId":"681e70d6-5524-4836-81af-eaa5c994a403"},
                    {"text":"EP/MENA/QATEPQA","thematicId":"fad82793-d90a-4a57-aa7d-9a9937ae739f"},
                    {"text":"EP/APC/BNTEPBN","thematicId":"b5319149-5693-4280-8024-916fd3edc114"},
                    {"text":"EP/APC/MMTEPMM","thematicId":"574501c8-a892-4454-ace8-6d98fcb1a4ae"},
                    {"text":"EP/AF/NGTEPNG","thematicId":"b31bac0b-f3ee-43c4-ab7e-06b972bb46e9"},
                    {"text":"EP/EAC/NLTEPNL","thematicId":"f5bfc2dd-e402-45f2-86ba-93f462cff34f"},
                    {"text":"EP/AF/CGTEPCG","thematicId":"374928d8-e6d1-4e6c-a569-6a3affd6ee5f"},
                    {"text":"EP/MENA/YETEPY","thematicId":"8ebe4113-9214-4b55-a189-decef147aa5f"},
                    {"text":"EP/AME/ARTEPAR","thematicId":"8d78084e-3e3e-4a37-b98e-8a5820631fb4"},
                    {"text":"EP/EAC/RUTEPRU","thematicId":"772b0d65-8a79-431f-817c-1a9255bf3e9d"},
                    {"text":"EP/APC/IDTEPID","thematicId":"77dbd851-7304-4831-935a-eac1bbc57a31"},
					{"text":"EP/APC/MM-TEPMM","thematicId":"574501c8-a892-4454-ace8-6d98fcb1a4ae"},
                    {"text":"EP/EAC/ITTEPIT","thematicId":"6d89367f-8755-42d0-a3d3-b26a7a65abe8"},
                    {"text":"EP/EAC/AZTEPABS","thematicId":"e3294719-f8f8-4136-8384-4dd1210e3392"},
                    {"text":"EP/AF/AOTEPAO","thematicId":"48d4ce70-f80c-401d-a395-f366320dd289"},
                    {"text":"EP/EAC/KZTEPKZ","thematicId":"41f5a788-ef9a-4b8f-b77b-889455be1946"},
                    {"text":"EP/AME/BRTEPBR","thematicId":"2a3e5195-76f8-44ca-9799-ea7909210f6c"},
                    {"text":"EP/MENA/AETEPUAE","thematicId":"1ecb22d5-5e07-48ae-92dd-8391bbd552ce"},
                    {"text":"EP/AME", "thematicId": "8441c5fa-c6fd-4298-8871-053ec2091d34"},
					{"text":"EP/AF/GA-TEPGA", "thematicId": "9213bd28-4b04-443d-b869-17fccc57bcd0"}
                ]},
                {"branch": "GRP", entities: [
                    {"text":"GRP/GAZ/TRD","thematicId":"ec2fbdb7-1381-44ca-8791-2ad1e36866d4"},
                    {"text":"GRP/GAZ/SMG","thematicId":"8c37176e-e426-4daa-a32d-41a8a67ae331"},
                    {"text":"GRP/GAZ/MKT","thematicId":"51b92ef1-a04d-4af5-8d63-bb6e1af86b08"},
                    {"text":"GRP/GAZ/SG","thematicId":"e9f12406-f08a-4bb5-a5b7-904deb8b6340"},
                    {"text":"GRP/GAZ/MKT/CE/FRTEGF","thematicId":"599fa0a3-fea9-4f45-affd-f3d68fbdfaae"},
                    {"text":"GRP/GAZ/RH","thematicId":"7828ab63-1c0d-4328-b396-d1518445bba5"},
                    {"text":"GRP/GAZ/SRI","thematicId":"96419674-64ed-48a5-91ee-bf5f4bea87ec"},
                    {"text":"GRP/GAZ/TRD/GBTGPL","thematicId":"0ec24ae4-bd7c-431c-bea9-da3dbb8d16c6"},
                    {"text":"GRP/GAZ/TRD/USTGPNA","thematicId":"be840fc8-18ce-4a70-b641-511517dfab88"},
                    {"text":"GRP/GAZ/MKT/GBTGPL","thematicId":"8679e4be-827c-4235-b208-21b38ebd87bc"} 
                ]},
                {"branch": "HLD", entities: [
                    {"text":"HLD/DG/STI","thematicId":"F78C0C80-EEDF-11E2-AB66-48EE6088709B"},
                    {"text":"HLD/DG/PSR/HSE", "thematicId": "1F5A93BC-EEE0-11E2-939D-7CEE6088709B"},
                     {"text":"HLD/DF/DSI","thematicId":"205a6eaf-5fc5-4d3d-85f6-d7b269b4a0d6"},
                     {"text":"HLD/TotalChina","thematicId":"a4809e12-331c-4888-8c4a-4f81f7245fca"},
                     {"text":"HLD/SG/DAP","thematicId":"a89d11ff-ecbc-4b8a-a851-c3ecd1df65fc"},
                     {"text":"HLD/DG/STI/R & D","thematicId":"f0d64c0d-0c25-416f-9b84-1141491632e4"},
                     {"text":"HLD/DG/PSR/SUR","thematicId":"bcc1aeaa-4a5e-4d30-ad81-6f8c909eafd6"},
                     {"text":"HLD/DF/FT","thematicId":"ab8ccbcc-c764-46c6-881a-2ef80db56a2b"},
                     {"text":"HLD/WAT formation","thematicId":"50a93dce-4200-4ad3-bf9d-eb2191f0e5e9"},
                     {"text":"HLD/WAT training","thematicId":"659be7ba-7618-4e51-a9a6-abd8da747daf"},
                     {"text":"HLD/DG/COM/MCN","thematicId":"408c9efb-ede8-432b-8b92-397b8a983199"},
                     {"text": "HLD/DG/ETH", "thematicId": "265A5892-EEDF-11E2-AA9F-86ED6088709B"},
                     {"text": "HLD/SG/DDE", "thematicId": "BB7A3FDC-EEDF-11E2-BE43-EEED6088709B"}
                ]},
                {"branch": "MS", entities: [
                    {"text":"MS/EUR/FR","thematicId":"343d5ebc-185b-41ef-b249-686c614b8451"},
                    {"text":"MS/AFR","thematicId":"8bb7b64f-2a5a-4397-9b74-44aa34719bb5"},
					{"text":"MS/AME","thematicId":"1bf8febe-8b8e-4784-855a-79a34694da55"},
                    {"text":"MS/APMO","thematicId":"c603b41a-389e-47eb-b338-8609bd7c59b3"},
                    {"text":"MS/RH","thematicId":"50106cee-96e3-46ab-b4dd-26f2d4e9e3d8"},
                    {"text":"MS/SMR","thematicId":"6c685c31-ef19-4d8c-83ec-224bac1c8c0d"},
                    {"text":"MS/LUB & SPE","thematicId":"13f88172-1842-4381-b3ba-90618d71f0c2"},
                    {"text":"MS/LUB & SPE/BTM","thematicId":"69d754fa-f149-4462-8bf8-1381afa11d2d"},
                    {"text":"MS/SGA/AME","thematicId":"1bf8febe-8b8e-4784-855a-79a34694da55"},
                    {"text":"MS/EUR/BE","thematicId":"707c0a82-7ed7-4f27-ae8c-ce7bd61c76a2"},
                    {"text":"MS/EUR/DOO/ES","thematicId":"8ee6352b-386e-41ec-bc32-a743d84ea844"},
                    {"text":"MS/EUR/DOO/GB","thematicId":"2b196108-4906-4539-b1e8-8ccc7ae4f34b"},
                    {"text":"MS/EUR/NL","thematicId":"d70d8342-ca68-43a0-b26a-0c9c13f48c68"},
                    {"text":"MS/EUR/OCE","thematicId":"cb038789-ec7c-4568-93d4-1d64c871d1b5"},
                    {"text":"MS/EUR/BE/LU","thematicId":"aa29955d-a6b5-41bb-a568-5b3453e72190"},
                    {"text":"MS/SMR/CPN", "thematicId":"80197c31-d777-438c-b341-05163d955c10"},
                    {"text":"MS/SMR/RECH","thematicId":"0b630f06-5780-44c4-a581-124e12b3cc72"},
                    {"text":"MS/EUR/DE","thematicId":"3e7ccfcd-f709-4532-a069-5a3e58f39386"},
                    {"text":"MS/LUB & SPE/LUB", "thematicId": "2b658b94-897b-42a3-a3c3-cadf23d08dca"},
                    {"text":"MS/EUR","thematicId":"f3a323f6-89ce-4ad8-b5cc-fb54ea752bb4"},
                    {"text":"MS/SGA","thematicId":"cf4db150-4e64-4545-926c-0601cf78f081"},
                    {"text":"MS/SMR/INN","thematicId":"16d310af-30a3-4347-b009-ae95b6edfa0c"},
                    {"text":"MS/LUB & SPE/GPL","thematicId":"9d7f1397-53f2-476c-8e54-f9f76112a4b1"},
                    {"text":"MS/OMM/BTM","thematicId":"69d754fa-f149-4462-8bf8-1381afa11d2d"},
					{"text":"MS/OMM","thematicId":"13f88172-1842-4381-b3ba-90618d71f0c2"},
                    {"text":"MS/SMR/SLP","thematicId":"f4ba2687-5422-47d6-8ca4-a1e4eca4b71c"},
                    {"text":"MS/LUB & SPE/AT","thematicId":"ac3160d1-b208-41e2-b042-5c12eb7b0416"}
                ]},
                {"branch": "RC", entities: [
                    {"text":"RC/RPO","thematicId":"34c4949a-2aea-4475-bb48-8655464a83b1"},
                    {"text":"RC/RBE","thematicId":"d887639c-b856-470a-93f5-6424ab695723"},
                    {"text":"RC/POL","thematicId":"dbe5db9b-acd5-40d5-96e6-0259cd75711f"},
                    {"text":"RC/SG","thematicId":"8521366d-91ef-447e-8e2d-c094943ee96b"},
                    {"text":"RC/SDR","thematicId":"03916b9e-4df5-40f2-a0e3-c6d545292661"},
                    {"text":"RC/IND","thematicId":"5e26e65e-ac16-47d9-ba1d-91c13e71033d"},
                    {"text":"RC/HSE","thematicId":"eeded1e2-2fb7-4429-9ffb-5f0f92f6a3db"},
                    {"text":"RC/RPA","thematicId":"8da752ba-ae5f-419f-8f01-c630ad79215a"},
                    {"text":"RC/RHC","thematicId":"7375164a-6727-49c9-8a27-1355bdb087ec"}
                ]},
                {"branch": "TS", entities: [
                    {"text": "The Entity TS (toutes)", "thematicId": "d012a67a-f580-427e-843e-55918854ec46"}
                ]},
                {"branch": "TGS", entities: [
                    {"text":"TGS/TC","thematicId":"E11220CC-1A25-11E3-AB64-BF1B6188709B"},
                    {"text":"TGS/TGITS", "thematicId": "40646410-a031-4802-a48a-27ea07df47cc"},
                    {"text":"TGS/SG","thematicId":"4e6dc5cb-bd50-4960-b025-861da3abd840"},
                    {"text":"TGS/TGFS","thematicId":"b3faeade-aaae-4d4b-95eb-5daf4d3964d0"},
                    {"text":"TGS/TGHRS","thematicId":"75d126e2-f7a9-4065-8158-75888be0ead1"},
                    {"text":"TGS/TLS","thematicId":"1cbec136-4e1f-4028-80bc-18d758b67564"},
                    {"text":"TGS/TFMS","thematicId":"9399de05-7e37-4079-bb69-966d46fb69da"}
                ]}

            ],

            'LANGUAGES': [
                {"text": "French", "value": "FR", "LCID": "1036"},
                {"text": "English", "value": "EN", "LCID": "1033"}
            ],
            'PREFERRD_LANGUAGES':[
                {"text": "Français","value": "FR","LCID": "1036"},
                {"text": "English","value": "EN","LCID": "1033"},
                {"text": "Español","value": "SP","LCID": "3082"},
                {"text": "Nederlands","value": "DU","LCID": "1043"},
                {"text": "Deutsch","value": "GE","LCID": "1031"},
                {"text": "Português","value": "PT","LCID": "2070"}

            ],
            'DEPTH': [
                {"text": "7", "value": "7"},
                {"text": "14", "value": "14"},
                {"text": "21", "value": "21"},
				{"text": "30", "value": "30"}
            ],
            'DEFAULT_USER_SETTINGS': {
                "branch": "HLD",
                "language": "FR",
                "preferrdlanguage": "FR",
                "display": {
                    'carousel': {checked: true},
                    'newsgroup': {checked: true},
                    'watsnewgroup': {checked: true},
                    'pressrelease': {checked: true},
                    'presspanorama': {checked: true},
                    'nominationsgroup': {checked: true},
                    'newsbranch': {checked: true},
                    'nominationsbranch': {checked: true},
                    'newsotherbranch': {checked: true},
                    'nominationsotherbranch': {checked: true},
                    'newsprofessionalfield': {checked: true},
                    'nominationsprofessionalfield': {checked: true},
                    'newshumanresources': {checked: true},
                    'newsgeographicalsite': {checked: true},
                    'newsentity': {checked: true},
                    'nominationsentity': {checked: true},
                    'safetyindicatordaily':{checked:true},
                    'safetyindicatormajoraccident':{checked:true},
                    'majornews':{checked:true},
                    'debug': {checked: false}
                },
				"depth": "14",
				"firstConnexion": true,
                "professionalField": "Systèmes d'Information Télécom",
                "geographicalSite": "Paris la Défense",
                "entity":"HLD/DF/DSIT"
            },

            'SAFETY_INDICATOR_PAGES':
            {
                "CAROUSEL_NEWS":"app.carousel-group",
                "WATSUP":"app.watsup-group",
                "WATSNEW":"app.watsnew-group"
            },
            'CONNECTION_ENDPOINT_URL':
            {
                "CONNECTION_URL":"http://10.27.63.154:84/rss_isg.xml"
                
            },
            'WAT_FEED_URLS':
            {
                'NEWS_FEED':'watnewsfeedupdated.aspx?',
                'DEVICE_TOKEN_FEED':'WATNewsDeviceDetails.aspx?'
            }
            


        })


})();
