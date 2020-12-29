import clsx from 'clsx';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, Select } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {
  MinecraftDefaultPortNumber, MinecraftServerTypeList, MinecraftServerVersionList
} from '@type-def-prj/Minecraft';

import { AlertDialogOkCancel } from '../components/AlertDialog';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  container: {
    paddingTop   : theme.spacing(0),
    paddingBottom: theme.spacing(2)
  },
  paper: {
    maxWidth    : 800,
    marginLeft  : 'auto',
    marginRight : 'auto',
    marginTop   : theme.spacing(6),
    marginBottom: theme.spacing(6),
    padding     : theme.spacing(4, 7, 0, 7)
  },
  paperTitle: {
    textAlign: 'center'
  },
  fixedHeight: {
    minHeight: 600
  },
  wrapper: {
    display       : 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop : theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin  : theme.spacing(0),
    minWidth: 160
  }
}));

type FromData = {
  /**
   * サーバー名
   */
  serverName: string;
  /**
   * サーバーバージョン
   */
  minecraftVer: string;
  /**
   * Minecraftのタイプ
   * "vanilla"等、タイプの英語名
   */
  minecraftType: string;
  /**
   * 作成時にサーバーを起動するか
   */
  serverImmediateStart: boolean;
  /**
   * サーバーポート番号
   * @info
   * FormしてはString型だが、バリデーションチェックによって必ず0~65535の整数になるため、
   * SubmitHandler内ではIntに変換することが可能。
   */
  serverPort: string;
};

export default function CreateServer(): JSX.Element {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // FormHooks フォームを制御するためのHooks関数
  const { register, handleSubmit, errors } = useForm<FromData>();

  // Minecraftバージョン選択用のStateとハンドラ
  const [selectedMinecraftVer, setSelectedMinecraftVer] = useState('');
  const handleMinecraftVer = (event: React.ChangeEvent<{ value: any }>): void => {
    setSelectedMinecraftVer(event.target.value as string);
  };

  // Minecraftタイプ選択用のStateとハンドラ
  const [selectedMinecraftType, setSelectedMinecraftType] = useState('');
  const handleMinecraftType = (event: React.ChangeEvent<{ value: any }>): void => {
    setSelectedMinecraftType(event.target.value as string);
  };

  // サーバー即時起動チェックボタン用のStateとハンドラ
  const [checkedServerImmediateStart, setServerImmediateState] = useState(false);
  const handleServerImmediateStart = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setServerImmediateState(event.target.checked);
  };

  // ダイアログ制御
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleDialogOk = (): void => {
    setDialogOpen(false);
  };
  const handleDialogCancel = (): void => {
    setDialogOpen(false);
  };

  // 送信ハンドラ
  const onSubmit: SubmitHandler<FromData> = async value => {
    console.log(value);
    setDialogOpen(true);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              <Typography variant="h6" gutterBottom className={classes.paperTitle}>
                <b>サーバー新規作成</b>
              </Typography>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="serverName"
                      name="serverName"
                      label="サーバー名"
                      fullWidth
                      autoFocus
                      inputRef={register({ required: true })}
                      helperText={errors.serverName && '必須項目です'}
                      error={Boolean(errors.serverName)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="serverPort"
                      name="serverPort"
                      label="サーバーポート番号"
                      defaultValue={MinecraftDefaultPortNumber}
                      fullWidth
                      autoFocus
                      inputRef={register({
                        required: {
                          value  : true,
                          message: '必須項目です'
                        },
                        validate: {
                          minPort: value => parseInt(value, 10) > 0 || '0~65535の範囲で入力してください',
                          maxPort: value => parseInt(value, 10) < 65535 || '0~65535の範囲で入力してください'
                        },
                        pattern: {
                          value  : /^[0-9]+$/,
                          message: '数値以外は受け付けません'
                        }
                      })}
                      helperText={errors.serverPort && errors.serverPort?.message}
                      error={Boolean(errors.serverPort)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="age-native-simple">Minecraftバージョン</InputLabel>
                      <Select
                        native
                        id="minecraftVer"
                        name="minecraftVer"
                        inputRef={register}
                        value={selectedMinecraftVer}
                        onChange={handleMinecraftVer}
                      >
                        {MinecraftServerVersionList.map((m: string) => {
                          return <option value={m}>{m}</option>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="age-native-simple">Minecraftタイプ</InputLabel>
                      <Select
                        native
                        id="minecraftType"
                        name="minecraftType"
                        inputRef={register}
                        value={selectedMinecraftType}
                        onChange={handleMinecraftType}
                      >
                        {MinecraftServerTypeList.map((m: string) => {
                          return <option value={m}>{m}</option>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedServerImmediateStart}
                          onChange={handleServerImmediateStart}
                          name="serverImmediateStart"
                          id="serverImmediateStart"
                          inputRef={register}
                        />
                      }
                      label="サーバー作成後すぐに起動する"
                    />
                  </Grid>
                </Grid>
                <div className={classes.wrapper}>
                  <Button type="submit" className={classes.button} variant="contained" color="primary">
                    サーバー作成
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <AlertDialogOkCancel
        isOpen={isDialogOpen}
        onOk={handleDialogOk}
        onClose={handleDialogCancel}
        message="サーバーを作成します。よろしいですか？"
        title="サーバー作成"
      />
    </div>
  );
}
