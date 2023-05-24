import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseQuery } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface NutritionFormProps {
    id?:string;
    data?:{}
}

interface NutritionState {
    name: string;
    num_servings: string;
}

export const NutritionForm = (props:NutritionFormProps) => {

    const dispatch = useDispatch();
    let { NutritionData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<NutritionState>(state => state.name)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseQuery(data.name))
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="query">Query </label>
                    <Input {...register('query')} name="query" placeholder='Query' />
                </div>
                <div>
                    <label htmlFor="num_servings">num_servings</label>
                    <Input {...register('num_servings')} name="num_servings" placeholder="num_servings"/>
                </div>
                <div>
                    <label htmlFor="aggregate">Aggregate</label>
                    <Input {...register('aggregate')} name="aggregate" placeholder="Camera Quality"/>
                </div>
                <div>
                    <label htmlFor="line_delimited">Line_delimited</label>
                    <Input {...register('line_delimited')} name="line_delimited" placeholder="line_delimited"/>
                </div>
                <div>
                    <label htmlFor="use_raw_foods">Use_raw_foods</label>
                    <Input {...register('use_raw_foods')} name="use_raw_foods" placeholder="Use_raw_foods"/>
                </div>
                <div>
                    <label htmlFor="include_subrecipe">include_subrecipe</label>
                    <Input {...register('include_subrecipe')} name="include_subrecipe" placeholder="include_subrecipe"/>
                </div>
                <div>
                    <label htmlFor="timezone">Timezone</label>
                    <Input {...register('timezone')} name="timezone" placeholder="timezone"/>
                </div>
                <div>
                    <label htmlFor="consumed_at">Consumed_at</label>
                    <Input {...register('consumed_at')} name="consumed_at" placeholder="Consumed_at"/>
                </div>
                <div>
                    <label htmlFor="lat">Lat</label>
                    <Input {...register('lat')} name="lat" placeholder="Lat"/>
                </div>
                <div>
                    <label htmlFor="lng">lng</label>
                    <Input {...register('lng')} name="lng" placeholder="lng"/>
                </div>
                <div>
                    <label htmlFor="meal_type">meal_type</label>
                    <Input {...register('meal_type')} name="meal_type" placeholder="meal_type"/>
                </div>
                <div>
                    <label htmlFor="use_branded_foods">use_branded_foods</label>
                    <Input {...register('use_branded_foods')} name="use_branded_foods" placeholder="use_branded_foods"/>
                </div>
                <div>
                    <label htmlFor="locale">locale</label>
                    <Input {...register('locale')} name="locale" placeholder="locale"/>
                </div>
                <div>
                    <label htmlFor="taxonomy">taxonomy</label>
                    <Input {...register('taxonomy')} name="taxonomy" placeholder="taxonomy"/>
                </div>
                <div>
                    <label htmlFor="ingredient_statement">ingredient_statement</label>
                    <Input {...register('ingredient_statement')} name="ingredient_statement" placeholder="ingredient_statement"/>
                </div>
                <div>
                    <label htmlFor="last_modified">last_modified</label>
                    <Input {...register('last_modified')} name="last_modified" placeholder="last_modified"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}