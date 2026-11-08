import json,subprocess,sys
from concurrent.futures import ThreadPoolExecutor
L=json.load(open('../lv/m2.json'))
def run(l):
    if max(l['w'],l['h'])>16: return l['n'],['fail','zu-gross']
    out=subprocess.run(['./solve','25','14000000'],input='\n'.join(l['m'])+'\n\n',capture_output=True,text=True).stdout.split()
    return l['n'],out
res={}
with ThreadPoolExecutor(4) as ex:
    for n,out in ex.map(run,L): res[n]=out
json.dump(res,open('m2-loes.json','w'))
ok=[n for n,o in res.items() if o[0]=='ok']
print('gelöst',len(ok),'von',len(L)); print('nicht:',{n:o[:2] for n,o in res.items() if o[0]!='ok'})
