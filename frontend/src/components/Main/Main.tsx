import React, { useState, useEffect, useRef } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { AutoComplete } from 'primereact/autocomplete';
import { Knob } from 'primereact/knob';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './Main.scss'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function Main(methods: any) {
  const [inn, setInn] = useState('');
  const [inns, setInns] = useState<any>(null);
  const [filteredInns, setFilteredInns] = useState<any>(null);
  const [isInnError, setIsInnError] = useState(false);
  const [isRecommends, setIsRecommends] = useState(false);
  const [score, setScore] = useState(0);
  const [recommendText1, setRecommendText1] = useState('');
  const [recommendText2, setRecommendText2] = useState('');
  const [recommendText3, setRecommendText3] = useState('');

  const [category, setCategory] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<any>('');
  const [isCategoryError, setIsCategoryError] = useState(false);
  const [days, setDays] = useState<any>(90);
  const [isTop, setIsTop] = useState(false);
  const [ratingData, setRatingData] = useState<any>(null);


  const agents = [
    { name: 'Агент', key: 'агент' },
    { name: 'Контрагент', key: 'контрагент' }]
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);


  const searchInn = (event: any) => {
    let curr_inn = event.query
    if (event.originalEvent.type !== 'change') curr_inn = inn

    methods.getAllInns(curr_inn)
      .then((data: any) => {
        setInns(data)

        if (data.length === 0) setIsInnError(true)
        else setIsInnError(false)

        return data
      })
      .then((data: any) => {
        let _filteredInns;

        if (!event.query.trim().length) {
          _filteredInns = [...data];
        }
        else {
          _filteredInns = data.filter((currInn: any) => {
            return currInn.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }

        setFilteredInns(_filteredInns);
      })
  }


  const searchCategory = (event: any) => {
    let curr_category = event.query
    if (event.originalEvent.type !== 'change') curr_category = category

    methods.getAllCategories(curr_category)
      .then((data: any) => {
        setInns(data)

        if (data.length === 0) setIsCategoryError(true)
        else setIsCategoryError(false)

        return data
      })
      .then((data: any) => {
        let _filteredCategories;

        if (!event.query.trim().length) {
          _filteredCategories = [...data];
        }
        else {
          _filteredCategories = data.filter((currCategory: any) => {
            return currCategory.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }

        setFilteredCategories(_filteredCategories);
      })
  }


  const handleSubmitInn = (evt: any) => {
    evt.preventDefault()
    setIsRecommends(false)

    if (isInnError) {
      return
    }

    methods.getRecommends(inn, selectedAgent.key)
      .then((data: any) => {
        let text = data[0].replaceAll('\n', '<br/>')
        setRecommendText1(data[0])
        setScore(data[1])
        // setRecommendText2(data[2])
        if (data.length >= 4) setRecommendText3(data[3])
        else setRecommendText3('')

        setIsRecommends(true)
      })
  }


  const handleSubmitTop = (evt: any) => {
    evt.preventDefault()
    setIsTop(false)

    if (isCategoryError) {
      return
    }

    methods.getTopInns(category, selectedAgent.key, days)
      .then((data: any) => {
        let tempRating: any = []

        console.log(data['ИНН'])

        for (let key of Object.keys(data['ИНН'])) {
          tempRating.push({ 'inn': data['ИНН'][key] })
        }

        let i = 0
        for (let key of Object.keys(data['количество успешно выполненных контрактов'])) {
          tempRating[i]['count_contr'] = data['количество успешно выполненных контрактов'][key]
          i += 1
        }

        i = 0
        for (let key of Object.keys(data['средний залог по сделке %'])) {
          tempRating[i]['avg_bail'] = data['средний залог по сделке %'][key]
          i += 1
        }

        i = 0
        for (let key of Object.keys(data['средний чек руб'])) {
          tempRating[i]['avg_bill'] = data['средний чек руб'][key]
          i += 1
        }

        i = 0
        for (let key of Object.keys(data['средняя удовлетворенность контрагента %'])) {
          tempRating[i]['avg_satisfaction'] = data['средняя удовлетворенность контрагента %'][key]
          i += 1
        }


        setRatingData(tempRating)

        setIsTop(true)
      })
  }


  useEffect(() => {
    // CountryService.getCountries().then((data) => setCountries(data));

    let tempRating = [
      { 'inn': '7123176699', 'score': '88.8' },
      { 'inn': '7123176666', 'score': '77.8' },
      { 'inn': '7123177777', 'score': '66.8' },
      { 'inn': '7123123123', 'score': '52.8' },
      { 'inn': '7123111111', 'score': '35.0' },
      { 'inn': '1111111111', 'score': '22.0' },
      { 'inn': '1123111111', 'score': '0.0' },
    ]

    setRatingData(tempRating)

  }, []);


  return (
    <main className='main'>
      <TabView>
        <TabPanel header="Рейтинг компании">
          <form onSubmit={handleSubmitInn}>
            <p className="m-0">
              На этой странице можно получить рейтинг выбранной компании.
            </p>
            <AutoComplete value={inn} suggestions={filteredInns} completeMethod={searchInn} onChange={(e) => setInn(e.value)} dropdown
              className={`${isInnError ? 'p-invalid' : ''}`} placeholder="Введите ИНН компании" />

            {/* <ListBox value={selectedAgent} onChange={(e) => setSelectedAgent(e.value)} options={agents}
            optionLabel="name" className="w-full md:w-14rem" /> */}

            <div className="flex flex-column gap-3">
              <p>
                Выберите тип деловых отношений
              </p>
              {agents.map((category) => {
                return (
                  <div key={category.key} className="flex align-items-center">
                    <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => setSelectedAgent(e.value)}
                      checked={selectedAgent.key === category.key} style={{ 'marginBottom': '10px' }} />
                    <label htmlFor={category.key} className="ml-2" style={{ 'marginLeft': '10px', 'marginBottom': '10px', 'display': 'inline-block' }}>{category.name}</label>
                  </div>
                );
              })}
            </div>
            <Button label="Получить рекомендации" style={{ 'marginTop': '10px' }} />
          </form>

          {isRecommends && <>
            <Knob value={score} size={200} style={{ 'marginTop': '45px' }} />
            <p style={{ 'whiteSpace': 'pre-line' }} dangerouslySetInnerHTML={{ __html: recommendText1 }}></p>
            <p>{recommendText2}</p>
            <p>{recommendText3}</p>
          </>
          }

        </TabPanel>
        <TabPanel header="Рекомендации по категориям">
          <form onSubmit={handleSubmitTop}>
            <p className="m-0">
              На этой странице можно получить топ компаний для выбранной категории.
            </p>
            <AutoComplete value={category} suggestions={filteredCategories} completeMethod={searchCategory}
              onChange={(e) => setCategory(e.value)} dropdown
              className={`${isCategoryError ? 'p-invalid' : ''}`} placeholder="Введите категорию" />

            <div className="flex flex-column gap-3">
              <p>
                Выберите тип деловых отношений
              </p>
              {agents.map((category) => {
                return (
                  <div key={category.key} className="flex align-items-center">
                    <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => setSelectedAgent(e.value)}
                      checked={selectedAgent.key === category.key} style={{ 'marginBottom': '10px' }} />
                    <label htmlFor={category.key} className="ml-2" style={{ 'marginLeft': '10px', 'marginBottom': '10px', 'display': 'inline-block' }}>{category.name}</label>
                  </div>
                );
              })}
            </div>

            <div className="flex-auto">
              <label htmlFor="minmax-buttons" className="font-bold block mb-2" style={{
                'display': 'block', 'marginTop': '10px',
                'marginBottom': '10px'
              }}>
                За сколько дней хотите получить товар?</label>
              <InputNumber inputId="minmax-buttons" value={days} onValueChange={(e) => setDays(e.value)} mode="decimal" showButtons min={0} max={1000} />
            </div>

            <Button label="Получить рекомендации" style={{ 'marginTop': '20px' }} />
          </form>

          {isTop &&
            <>
              <DataTable value={ratingData} tableStyle={{ minWidth: '50rem' }} style={{ 'marginTop': '20px' }}>
                <Column field="inn" header="ИНН"></Column>
                <Column field="count_contr" header="Кол-во успешно выполненных контрактов"></Column>
                <Column field="avg_bail" header="Средний залог по сделке, %"></Column>
                <Column field="avg_bill" header="Средний чек, руб"></Column>
                <Column field="avg_satisfaction" header="Средняя удовлетворенность контрагента, %"></Column>
              </DataTable>
            </>}
        </TabPanel>
      </TabView>
    </main >
  )
}
