import api from './utils/api'
import Main from './components/Main/Main'
import { useEffect, useState } from 'react'
import './App.scss';
import React from 'react';

function App() {
    function getAllInns(start_text: string) {
        return api.getAllInns(start_text)
    }

    function getRecommends(inn: string, agent: string) {
        return api.getRecommends(inn, agent)
    }

    function getAllCategories(start_text: string) {
        return api.getAllCategories(start_text)
    }

    function getTopInns(category: string, agent: string, deadline_days: number) {
        return api.getTopInns(category, agent, deadline_days)
    }

    return (
        <div className="page">
            <Main getAllInns={getAllInns} getRecommends={getRecommends} getAllCategories={getAllCategories} getTopInns={getTopInns} />
        </div>
    )
}

export default App
